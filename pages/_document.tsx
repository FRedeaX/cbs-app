import Document, { Head, Html, Main, NextScript } from "next/document";

import { roboto } from "@/styles/fonts/roboto";

class _Document extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <style>{roboto}</style>
          <link rel="preconnect" href="https://mc.yandex.ru/" />

          <link rel="shortcut icon" href="/logos/favicon.ico" />
          <link rel="shortcut icon" href="/logos/logo@16.png" sizes="16x16" />
          <link rel="shortcut icon" href="/logos/logo@132.png" sizes="32x32" />
          <link
            rel="shortcut icon"
            href="/logos/logo@192.png"
            sizes="192x192"
          />

          <link
            rel="apple-touch-icon"
            href="/logos/logo@76.png"
            sizes="76x76"
          />
          <link
            rel="apple-touch-icon"
            href="/logos/logo@120.png"
            sizes="120x120"
          />
          <link
            rel="apple-touch-icon"
            href="/logos/logo@152.png"
            sizes="152x152"
          />
          <link
            rel="apple-touch-icon"
            href="/logos/logo@180.png"
            sizes="180x180"
          />

          <meta name="theme-color" content="#f2f2f2" />
          <meta name="yandex-verification" content="b761a7a26da38d4e" />
        </Head>
        <body style={{ backgroundColor: "var(--background-color-white)" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
