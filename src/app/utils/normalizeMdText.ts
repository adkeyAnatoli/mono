export function normalizeMdText(s: string): string {
  return s.replace(/\\([+\-|.])/g, '$1');
}
