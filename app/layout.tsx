import { Metadata, Viewport } from "next";
import { ReactNode } from "react";

import { getMenu, getMetadata } from "@/core/ssr";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import { Layout } from "@/components/UI/Layout/Layout";
import { Providers } from "src/app/providers";

import { Polyfill } from "./Polyfill";

import "@/styles/fonts/roboto";
import "@/styles/styles.css";
import "@/styles/variables/global.css";
import "@/styles/variables/wp.css";

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
  const menu = await getMenu();

  return (
    <html lang="ru">
      <body>
        <Polyfill />
        <ErrorBoundary>
          <Providers>
            <Layout menu={menu}>{children}</Layout>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
