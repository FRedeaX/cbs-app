import { headers as nextHeaders } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";

import { UA } from "./const";

/**
 * @default UA.desktope
 */
type Fallback = typeof UA.desktope;

export type UAPlatform = typeof UA.desktope | typeof UA.touch;

/**
 * Возвращает user-agent
 * @param headers
 * @param fallback desktope
 * @returns UA
 */
export const getUAPlatform = (
  headers: Awaited<ReturnType<typeof nextHeaders>>,
  fallback: Fallback = UA.desktope,
): UAPlatform => {
  if (headers.get("sec-ch-ua-mobile") === "?0") return UA.desktope;
  if (headers.get("sec-ch-ua-mobile") === "?1") return UA.touch;

  const headersUA = headers.get("user-agent");
  if (headersUA === null) return fallback;

  const ua = getSelectorsByUserAgent(headersUA);
  if (ua.isDesktop) return UA.desktope;
  if (ua.isMobile) return UA.touch;

  return fallback;
};
