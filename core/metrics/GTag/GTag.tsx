import Script from "next/script";

type Gtag = (...args: unknown[]) => void;

export const GTag = () =>
  process.env.NODE_ENV === "production" && (
    <Script
      id="sgt"
      src="https://www.googletagmanager.com/gtag/js?id=G-SSD21VV9G7"
      onLoad={() => {
        window.dataLayer = window.dataLayer || [];

        const gtag: Gtag = (...args) => {
          window.dataLayer.push(args);
        };

        gtag("js", new Date());
        gtag("config", "G-SSD21VV9G7");
      }}
    />
  );
