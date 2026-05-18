/**
 * Fills missing keys in locale messages from fallback (e.g. en) so new pages
 * work before every locale file is synced.
 */
export function fillMissingMessages(
  localeMsgs: Record<string, unknown>,
  fallbackMsgs: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...localeMsgs };
  for (const key of Object.keys(fallbackMsgs)) {
    const fv = fallbackMsgs[key];
    const ov = out[key];
    if (ov === undefined) {
      out[key] = fv;
    } else if (
      fv !== null &&
      typeof fv === 'object' &&
      !Array.isArray(fv) &&
      ov !== null &&
      typeof ov === 'object' &&
      !Array.isArray(ov)
    ) {
      out[key] = fillMissingMessages(
        ov as Record<string, unknown>,
        fv as Record<string, unknown>
      );
    }
  }
  return out;
}
