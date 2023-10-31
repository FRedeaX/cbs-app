import dynamic from "next/dynamic";

export const DynamicOffer = dynamic(
  () => import("./Offer").then((res) => res.Offer),
  {
    ssr: true,
  },
);
