"use client";

import { FC, useEffect } from "react";

import { scrollbarWidth } from "@/helpers/frontend";

export const ScrollbarWidthScript: FC = () => {
  useEffect(scrollbarWidth, []);

  return null;
};
