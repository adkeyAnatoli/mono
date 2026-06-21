import { normalizeMdText } from './normalizeMdText';

/**
 * Plain copy for UI: no bold/italic/links/code from Markdown — styling via CSS only.
 * Strips common inline MD markers while keeping the visible wording.
 */
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
