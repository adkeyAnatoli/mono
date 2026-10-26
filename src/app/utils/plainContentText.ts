import { normalizeMdText } from './normalizeMdText';

export function plainContentText(s: string): string {
  let t = normalizeMdText(s);
  for (let i = 0; i < 20; i++) {
    const next = t
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1');
    if (next === t) break;
    t = next;
  }
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  t = t.replace(/`([^`]+)`/g, '$1');
  return t;
}
