import { IncomingHttpHeaders } from "http2";
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
  headers: IncomingHttpHeaders,
  fallback: Fallback = UA.desktope,
): UAPlatform => {
  if (headers["sec-ch-ua-mobile"] === "?0") return UA.desktope;
  if (headers["sec-ch-ua-mobile"] === "?1") return UA.touch;

  if (headers["user-agent"] === undefined) return fallback;
  const ua = getSelectorsByUserAgent(headers["user-agent"]);
  if (ua.isDesktop) return UA.desktope;
  if (ua.isMobile) return UA.touch;

  return fallback;
};
