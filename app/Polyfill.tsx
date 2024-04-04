"use client";

import { FC, useEffect } from "react";
import smoothScroll from "smoothscroll-polyfill";

export const Polyfill: FC = () => {
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    window.__forceSmoothScrollPolyfill__ = true;
    smoothScroll.polyfill();
  }, []);

  return null;
};
