"use client";

import dynamic from "next/dynamic";

export const DynamicOfferTabs = dynamic(
  () => import("./Offer.Tabs").then((res) => res.OfferTabs),
  { ssr: false },
);
