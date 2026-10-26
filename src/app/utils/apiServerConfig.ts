const normalizeOrigin = (value: string) => {
  const trimmed = value.trim().replace(/\/+$/, '');
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

export const getUpstreamApiOrigin = () => {
  const raw = process.env.API_HOST?.trim();
  if (!raw) {
    throw new Error('API_HOST is not configured');
  }

  return normalizeOrigin(raw);
};

export const getUpstreamApiToken = () => process.env.API_TOKEN?.trim() || '';

export const SRC_CLIENT_IP_HEADER = 'src-client-ip';
