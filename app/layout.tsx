import { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";

import { getHeaderMenu, getMetadata } from "@/core/ssr";
import { Layout } from "@/components/UI/Layout/Layout";
import { Providers } from "src/app/providers";
import { Scripts } from "src/app/scripts";

import { Polyfill } from "./Polyfill";

import "@/styles/styles.css";
import "@/styles/variables/global.css";
import "@/styles/variables/wp.css";

const roboto = Roboto({
  display: "swap",
  subsets: ["cyrillic"],
  variable: "--font-family-roboto",
  weight: ["100", "300", "400", "500"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const { title, description, url } = await getMetadata();

  return {
    title: { template: `%s | ${title}`, default: title },
    description,
    metadataBase: new URL(url),
    verification: { yandex: "b761a7a26da38d4e" },
    openGraph: { title, description, siteName: title, url, type: "website" },
  };
};

export const viewport: Viewport = {
  themeColor: "f2f2f2",
};

export const revalidate = 600;

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const menu = await getHeaderMenu();

  return (
    <html lang="ru" className={roboto.variable}>
      <body>
        <Polyfill />
        <Providers>
          <Layout menu={menu}>{children}</Layout>
        </Providers>
        <Scripts />
      </body>
    </html>
  );
};

export default RootLayout;
