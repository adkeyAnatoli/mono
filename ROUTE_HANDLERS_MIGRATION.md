# Миграция API на route-handlers (переносимый план)

Документ описывает изменения, применённые в **monzocasino.com**, чтобы перенести их в другой Next.js-репозиторий с той же архитектурой:

- Next.js 14+ / 16 (App Router)
- `next-intl` с `[locale]`
- RTK Query для клиентских запросов
- Прямые вызовы `https://api.adkey-seo.com/api/website/...` из браузера
- Картинки через `api.adkey-seo.com/storage/images/...`

**Цель:** API-токен не уходит в браузер, клиент ходит на локальный `/api/website/*`, сервер проксирует на upstream из `.env`, картинки берутся из CDN-полей `*_bucket`.

---

## 1. Целевая архитектура

```
Браузер (RTK Query)
  → GET /api/website/get-website/{SITE_ID}
    → route.ts (Next.js Route Handler)
      → https://{API_HOST}/api/website/...
        + X-API-Key (из API_TOKEN)
        + src-client-ip (IP клиента)

Server Component (fetch на сервере)
  → напрямую https://{API_HOST}/api/website/...
    + X-API-Key (токен только на сервере)

Картинки
  → offer.logo_bucket / game.image_bucket (CDN, напр. panvfg.com)
  → НЕ api.adkey-seo.com/storage/images/...
```

**Важно:** `rewrites` в `next.config` не нужны — прокси реализуется через Route Handler.

**Важно:** middleware/proxy для i18n должен **исключать** `/api`:

```ts
'/((?!api|trpc|_next|_vercel|.*\\..*).*)';
```

---

## 2. Переменные окружения

Создать/обновить `.env` (коммитится в репозиторий):

```env
API_HOST=api.depnxk.com
API_TOKEN=sk_gK5pcQ9beHnAhMLkzpbXi5YR167qv5qqk9EwnQSG
NEXT_PUBLIC_SITE_ID=235
```

| Переменная            | Где используется            | Описание                                                     |
| --------------------- | --------------------------- | ------------------------------------------------------------ |
| `API_HOST`            | route handler, server fetch | Upstream без протокола или с `https://`                      |
| `API_TOKEN`           | route handler, server fetch | Заголовок `X-API-Key`, только server-side                    |
| `NEXT_PUBLIC_SITE_ID` | `api.ts`, server fetch      | ID сайта для эндпоинтов `get-website`, `get-geo-text` и т.д. |

В `.gitignore` оставить только локальные оверрайды:

```
.env*.local
```

> **Важно:** `.env` не игнорируется и может коммититься. Если `API_TOKEN` не должен попадать в git — храните секреты в `.env.local` (он по-прежнему в `.gitignore`).

---

## 3. Новые файлы (скопировать как есть)

### 3.1 `src/utils/apiServerConfig.ts`

```ts
const normalizeOrigin = (value: string) => {
  const trimmed = value.trim().replace(/\/+$/, '');
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

/** Upstream API — server-only */
export const getUpstreamApiOrigin = () => {
  const raw = process.env.API_HOST?.trim();
  if (!raw) {
    throw new Error('API_HOST is not configured');
  }

  return normalizeOrigin(raw);
};

/** API key for upstream — server-only */
export const getUpstreamApiToken = () => process.env.API_TOKEN?.trim() || '';

/** Client IP header sent to upstream */
export const SRC_CLIENT_IP_HEADER = 'src-client-ip';
```

### 3.2 `src/utils/getClientIp.ts`

```ts
import type { NextRequest } from 'next/server';
import { SRC_CLIENT_IP_HEADER } from '@/utils/apiServerConfig';

const isUsableClientIp = (ip: string | null | undefined) => {
  if (!ip) return false;
  return ip !== '::1' && ip !== '127.0.0.1';
};

export const getClientIp = (request: NextRequest) => {
  const srcClientIp = request.headers.get(SRC_CLIENT_IP_HEADER)?.trim();
  if (isUsableClientIp(srcClientIp)) {
    return srcClientIp!;
  }

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstHop = forwarded.split(',')[0]?.trim();
    if (isUsableClientIp(firstHop)) {
      return firstHop!;
    }
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (isUsableClientIp(realIp)) {
    return realIp!;
  }

  return null;
};
```

### 3.3 `src/utils/apiUrl.ts`

```ts
import type { IGame, IOffer } from '@/utils/interfaces';

/** Absolute CDN URL from API bucket field. */
export function apiGameImageUrl(
  game: Pick<IGame, 'image_bucket' | 'image'>
): string {
  return game.image_bucket ?? '';
}

export function apiOfferLogoUrl(
  offer: Pick<IOffer, 'logo_bucket' | 'logo'>
): string {
  return offer.logo_bucket ?? '';
}
```

> Если типы называются иначе (`Game`, `Offer` из `@/types/*`) — адаптировать импорты, логика та же.

### 3.4 `src/app/api/website/[...path]/route.ts`

```ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getUpstreamApiOrigin,
  getUpstreamApiToken,
  SRC_CLIENT_IP_HEADER,
} from '@/utils/apiServerConfig';
import { getClientIp } from '@/utils/getClientIp';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const upstreamOrigin = getUpstreamApiOrigin();
    const token = getUpstreamApiToken();
    const targetUrl = `${upstreamOrigin}/api/website/${path.join('/')}${request.nextUrl.search}`;
    const clientIp = getClientIp(request);

    const headers: HeadersInit = {
      Accept: 'application/json',
    };

    if (token) {
      headers['X-API-Key'] = token;
    }

    if (clientIp) {
      headers[SRC_CLIENT_IP_HEADER] = clientIp;
    }

    const upstream = await fetch(targetUrl, {
      headers,
      cache: 'no-store',
    });

    const body = await upstream.text();

    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('content-type') || 'application/json',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Upstream request failed';

    return NextResponse.json(
      { error: message },
      { status: message.includes('API_HOST') ? 503 : 502 }
    );
  }
}
```

---

## 4. Изменения в существующих файлах

### 4.1 RTK Query — `src/redux/slice/api.ts`

**Было:**

```ts
baseQuery: fetchBaseQuery({
  baseUrl: "https://api.adkey-seo.com/api/website/",
}),
// ...
query: () => `get-website/1332`,
```

**Стало:**

```ts
const WEBSITE_ID = process.env.NEXT_PUBLIC_SITE_ID;

baseQuery: fetchBaseQuery({
  baseUrl: "/api/website/",
}),
// ...
getRootData: builder.query<IRoot, string>({
  query: () => `get-website/${WEBSITE_ID}`,
  keepUnusedDataFor: 0,
}),
getGamesData: builder.query<IGame[], string>({
  query: () => "get-games/Gambling?view=vertical",
  keepUnusedDataFor: 0,
}),
```

`WEBSITE_ID` берётся из `NEXT_PUBLIC_SITE_ID` в `.env` — захардкоженный ID в коде не нужен.

Поиск по проекту: `api.adkey-seo.com`, `adkey-seo` — все вхождения в `src/` должны исчезнуть.

### 4.2 Типы — `src/utils/interfaces.ts` (или аналог)

Добавить опциональные поля:

```ts
export interface IOffer {
  // ...
  logo_bucket?: string;
  logo_light_bucket?: string;
}

export interface IGame {
  // ...
  image_bucket?: string;
}
```

### 4.3 Картинки в компонентах

**Было:**

```tsx
src={`https://api.adkey-seo.com/storage/images/offers/${card.logo}`}
src={`https://api.adkey-seo.com/storage/images/games/${game.image}`}
```

**Стало:**

```tsx
import { apiOfferLogoUrl } from "@/utils/apiUrl";
import { apiGameImageUrl } from "@/utils/apiUrl";

src={apiOfferLogoUrl(card)}
src={apiGameImageUrl(game)}
```

Типичные файлы: `TopCasino.tsx`, `Games.tsx` (и любые другие с hardcode storage URL).

### 4.4 Серверный fetch (если есть)

Пример: `src/lib/bonusGeo/fetchBonusGeoContent.ts` — **не ходить** на `api.adkey-seo.com` напрямую.

**Было:**

```ts
const BONUS_GEO_BASE =
  'https://api.adkey-seo.com/api/website/get-geo-text/1332';
const res = await fetch(`${BONUS_GEO_BASE}/${code}`, {
  next: { revalidate: 0 },
});
```

**Стало:**

```ts
import {
  getUpstreamApiOrigin,
  getUpstreamApiToken,
} from '@/utils/apiServerConfig';

const WEBSITE_ID = process.env.NEXT_PUBLIC_SITE_ID;
const url = `${getUpstreamApiOrigin()}/api/website/get-geo-text/${WEBSITE_ID}/${code}`;
const token = getUpstreamApiToken();
const headers: HeadersInit = { Accept: 'application/json' };
if (token) headers['X-API-Key'] = token;

const res = await fetch(url, { headers, next: { revalidate: 0 } });
```

> Если в целевом репозитории нет server-side fetch к API — этот пункт пропустить.

### 4.5 `next.config.mjs` — images

**Было:**

```js
remotePatterns: [
  {
    protocol: "https",
    hostname: "api.adkey-seo.com",
    pathname: "/storage/images/**",
  },
],
```

**Стало:**

```js
remotePatterns: [
  {
    protocol: "https",
    hostname: "**",
  },
],
unoptimized: true,
```

CDN-домены (`panvfg.com` и др.) приходят в `*_bucket` из API.

**Проверка `unoptimized`:** открыть `next.config.mjs` → блок `images`. Если строки `unoptimized: true` нет — добавить (сразу после `remotePatterns`). Без неё Next.js Image Optimizer может ломать загрузку CDN-картинок с динамических доменов.

### 4.6 Layout — убрать preconnect к API

Удалить из `src/app/[locale]/layout.tsx` (или корневого layout):

```html
<link rel="preconnect" href="https://api.adkey-seo.com" />
<link rel="dns-prefetch" href="//api.adkey-seo.com" />
```

### 4.7 `tsconfig.json`

Исключить эталонную/вспомогательную папку, если она есть в репозитории:

```json
"exclude": ["node_modules", "example"]
```

### 4.8 `eslint.config.mjs`

Исключить `example/` из линта (если папка есть):

```js
ignores: [".next/**", "out/**", "build/**", "next-env.d.ts", "example/**"],
```

### 4.9 Удаление `next-pwa` (если установлен)

Проверка:

```bash
grep -E "next-pwa|withPWA" package.json next.config.* 2>/dev/null
ls public/sw.js public/workbox-*.js 2>/dev/null
```

Если `next-pwa` найден — удалить, **manifest оставить**.

**`package.json`** — убрать зависимость:

```bash
npm uninstall next-pwa
# или: yarn remove next-pwa
```

**`next.config.mjs`** — убрать обёртку `withPWA` и импорт:

```js
// Было:
import withPWA from "next-pwa";

const nextConfig = { /* ... */ };

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})(nextConfig);

// Стало:
const nextConfig = { /* ... */ };

export default nextConfig;
```

**Сгенерированные PWA-файлы** — удалить из `public/` (если есть):

- `sw.js`, `sw.js.map`
- `workbox-*.js`, `workbox-*.js.map`

**Оставить без изменений:**

- `public/manifest.json`
- `<link rel="manifest" href="/manifest.json" />` в layout
- иконки в `public/icons/`

> Если `next-pwa` в проекте нет — пункт пропустить.

### 4.10 SEO-файлы: `robots.txt` и `sitemap.xml`

Оба файла должны лежать в `public/`:

```bash
ls public/robots.txt public/sitemap.xml
```

**Если sitemap в `src/app/` (App Router) — перенести в `public/` и упростить:**

Некоторые репозитории хранят sitemap как `src/app/sitemap.xml`. Для единообразия и простоты деплоя переносим в статику и **убираем лишние теги** внутри `<url>`:

- удалить `<lastmod>`, `<changefreq>`, `<priority>`
- оставить только `<loc>`

```xml
<!-- Было -->
<url>
  <loc>https://example.com</loc>
  <lastmod>2025-04-29T17:50:25.021Z</lastmod>
  <changefreq>yearly</changefreq>
  <priority>1</priority>
</url>

<!-- Стало -->
<url>
  <loc>https://example.com</loc>
</url>
```

Шаги:

1. Создать `public/sitemap.xml` в упрощённом виде (только `<loc>`, домен актуальный)
2. Удалить `src/app/sitemap.xml`

Next.js отдаёт `public/sitemap.xml` по URL `/sitemap.xml`. Ссылка `Sitemap:` в `robots.txt` менять не нужна, если домен уже актуален.

**Если `public/sitemap.xml` отсутствует** — создать по шаблону целевого домена (только `<loc>`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com</loc>
  </url>
</urlset>
```

**`public/robots.txt`** — удалить директиву `Host` (Яндекс-специфичная, не нужна):

```txt
# Было:
User-agent: *
Allow: /
Disallow: /casino/
Host: https://example.com
Sitemap: https://example.com/sitemap.xml

# Стало:
User-agent: *
Allow: /
Disallow: /casino/
Sitemap: https://example.com/sitemap.xml
```

Поиск по проекту: `^Host:` в `public/robots.txt` — вхождений быть не должно.

**`public/sitemap.xml`** — каноническое расположение; внутри `<url>` только `<loc>`. При смене домена обновить `<loc>` на актуальный URL. Не держать дубликат в `src/app/sitemap.xml`.

Поиск по проекту: `<lastmod>`, `<changefreq>`, `<priority>` в `public/sitemap.xml` — вхождений быть не должно.

---

## 5. Чеклист перед коммитом

- [ ] Созданы 4 новых файла: `apiServerConfig.ts`, `getClientIp.ts`, `apiUrl.ts`, `route.ts`
- [ ] RTK Query `baseUrl` = `"/api/website/"`
- [ ] `NEXT_PUBLIC_SITE_ID` задан в `.env`, `WEBSITE_ID` читается из env в `api.ts`
- [ ] В `src/` нет `api.adkey-seo.com` / `adkey-seo`
- [ ] Картинки через `apiOfferLogoUrl` / `apiGameImageUrl`
- [ ] В интерфейсах есть `logo_bucket`, `image_bucket`
- [ ] `next.config` images: `hostname: "**"`
- [ ] `next.config` images: `unoptimized: true` (если нет — добавить)
- [ ] Убран preconnect к API из layout
- [ ] `.env` с `API_HOST`, `API_TOKEN`, `NEXT_PUBLIC_SITE_ID`
- [ ] `.env*.local` в `.gitignore` (сам `.env` — нет)
- [ ] middleware/proxy исключает `/api`
- [ ] `next-pwa` удалён (если был): нет в `package.json`, нет `withPWA` в `next.config`
- [ ] Удалены `public/sw.js`, `public/workbox-*.js` (если были)
- [ ] `public/manifest.json` и `<link rel="manifest">` в layout **сохранены**
- [ ] Есть `public/robots.txt` и `public/sitemap.xml`
- [ ] Нет `src/app/sitemap.xml` (перенесён в `public/`, если был)
- [ ] В `public/sitemap.xml` только `<loc>` (нет `lastmod`, `changefreq`, `priority`)
- [ ] В `public/robots.txt` нет директивы `Host:`

---

## 6. Проверка после миграции

```bash
npm install
npm run lint
npm run build
npm run dev
```

Runtime (подставить свой SITE_ID):

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "http://localhost:3000/api/website/get-website/<SITE_ID>"

curl -s "http://localhost:3000/api/website/get-games/Gambling?view=vertical" | head -c 300
```

Ожидаемый результат:

- HTTP `200`
- JSON с офферами/играми
- В ответе `logo_bucket` / `image_bucket` с CDN-URL (не `api.adkey-seo.com`)
- В DevTools Network браузера запросы идут на `/api/website/...`, не на внешний API

---

## 7. Адаптация под другой репозиторий

| Отличие                                 | Что сделать                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Другой `SITE_ID`                        | Изменить `NEXT_PUBLIC_SITE_ID` в `.env` (в `api.ts` и server fetch — `process.env.NEXT_PUBLIC_SITE_ID`) |
| Нет `fetchBonusGeoContent`              | Пропустить п. 4.4                                                                                       |
| Нет RTK Query, есть `fetchOffers`       | Клиент: `/api/website/...`; сервер: `getUpstreamApiOrigin()`                                            |
| Нет `next-intl`                         | Route handler работает без изменений; проверить, что middleware не перехватывает `/api`                 |
| Другие компоненты с картинками          | Grep: `storage/images`, `adkey-seo` — заменить на `apiUrl` хелперы                                      |
| Папка `example/` отсутствует            | Пропустить exclude в tsconfig/eslint                                                                    |
| `next-pwa` не установлен                | Пропустить п. 4.9                                                                                       |
| Нет `public/robots.txt` / `sitemap.xml` | Создать по шаблону домена (п. 4.10)                                                                     |
| Sitemap в `src/app/sitemap.xml`         | Перенести в `public/sitemap.xml`, упростить до `<loc>`, удалить из `src/app/` (п. 4.10)                 |

---

## 8. Что НЕ переносить

- `fetchOffers` / `fetchGames` / `websiteApi` / `http` / `apiCache` — **не нужны**, если проект на RTK Query (как monzocasino)
- `src/app/api/route.ts` с ответом `501` — опционально, не использовалось

---

## 9. Сводка файлов (monzocasino.com)

| Действие                | Путь                                                                              |
| ----------------------- | --------------------------------------------------------------------------------- |
| **Создать**             | `src/app/api/website/[...path]/route.ts`                                          |
| **Создать**             | `src/utils/apiServerConfig.ts`                                                    |
| **Создать**             | `src/utils/getClientIp.ts`                                                        |
| **Создать**             | `src/utils/apiUrl.ts`                                                             |
| **Изменить**            | `src/redux/slice/api.ts`                                                          |
| **Изменить**            | `src/lib/bonusGeo/fetchBonusGeoContent.ts` (если есть)                            |
| **Изменить**            | `src/utils/interfaces.ts`                                                         |
| **Изменить**            | `src/components/topCasino/TopCasino.tsx`                                          |
| **Изменить**            | `src/components/games/Games.tsx`                                                  |
| **Изменить**            | `next.config.mjs`                                                                 |
| **Изменить**            | `src/app/[locale]/layout.tsx`                                                     |
| **Изменить**            | `.env`, `.gitignore` (только `.env*.local`), `tsconfig.json`, `eslint.config.mjs` |
| **Изменить**            | `package.json`, `next.config.mjs` — удалить `next-pwa` (если был)                 |
| **Удалить**             | `public/sw.js`, `public/workbox-*.js` — артефакты PWA (если были)                 |
| **Проверить**           | `public/robots.txt` — убрать `Host:`                                              |
| **Создать / перенести** | `public/sitemap.xml` (из `src/app/sitemap.xml`, если был)                         |
| **Удалить**             | `src/app/sitemap.xml` — после переноса в `public/`                                |
| **Проверить**           | `public/sitemap.xml`, `public/manifest.json` — должны остаться                    |

---

_Документ сгенерирован по фактической миграции monzocasino.com, июль 2026._
