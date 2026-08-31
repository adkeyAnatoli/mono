import type { NextRequest } from 'next/server';
import { SRC_CLIENT_IP_HEADER } from '@/app/utils/apiServerConfig';

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
