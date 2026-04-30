/**
 * Normalizes Markdown escape sequences for display (not for storage semantics).
 * Removes backslash before -, +, | when used as MD escapes; does not alter wording.
 */
export function normalizeMdText(s: string): string {
  return s.replace(/\\([+\-|])/g, '$1');
}
