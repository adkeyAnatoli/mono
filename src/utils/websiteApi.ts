import {
  getUpstreamApiOrigin,
  getUpstreamApiToken,
} from "@/utils/apiServerConfig";

export function getWebsiteApiUrl(path: string): string {
  if (typeof window !== "undefined") {
    return `/api/website/${path}`;
  }

  return `${getUpstreamApiOrigin()}/api/website/${path}`;
}

export function getWebsiteApiHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Cache-Control": "no-cache",
  };

  const token = getUpstreamApiToken();
  if (token) {
    headers["X-API-Key"] = token;
  }

  return headers;
}
