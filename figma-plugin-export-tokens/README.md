# Export variables → `figma-variables.json`

1. Figma → **Plugins** → **Development** → **Import plugin from manifest…**
2. Выберите `figma-plugin-export-tokens/manifest.json` в этом репозитории.
3. Запустите плагин **Export variables → figma-variables.json**.
4. Нажмите **Export & copy JSON** — буфер обмена получит объект с именами переменных и значениями.
5. Вставьте содержимое в корневой файл **`figma-variables.json`** проекта (полная замена).

Цвета сериализуются как `#RRGGBB`. Типографика и прочие сложные значения — в виде строки, максимально близкой к ручному экспорту; при расхождениях сверяйте с панелью Variables в Figma.
