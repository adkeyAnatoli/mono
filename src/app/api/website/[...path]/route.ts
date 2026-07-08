import { NextRequest, NextResponse } from "next/server";
import {
  getUpstreamApiOrigin,
  getUpstreamApiToken,
  SRC_CLIENT_IP_HEADER,
} from "@/utils/apiServerConfig";
import { getClientIp } from "@/utils/getClientIp";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const upstreamOrigin = getUpstreamApiOrigin();
    const token = getUpstreamApiToken();
    const targetUrl = `${upstreamOrigin}/api/website/${path.join("/")}${request.nextUrl.search}`;
    const clientIp = getClientIp(request);

    const headers: HeadersInit = {
      Accept: "application/json",
    };

    if (token) {
      headers["X-API-Key"] = token;
    }

    if (clientIp) {
      headers[SRC_CLIENT_IP_HEADER] = clientIp;
    }

    const upstream = await fetch(targetUrl, {
      headers,
      cache: "no-store",
    });

    const body = await upstream.text();

    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upstream request failed";

    return NextResponse.json(
      { error: message },
      { status: message.includes("API_HOST") ? 503 : 502 },
    );
  }
}
