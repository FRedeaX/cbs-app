import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

// import Script from "next/script";
// import { scrollbarWidth } from "~/helpers";

class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://mc.yandex.ru/" />

          <link rel="shortcut icon" href="/logos/favicon.ico" />
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

          <link rel="shortcut icon" href="/logos/logo@16.png" sizes="16x16" />
          <link rel="shortcut icon" href="/logos/logo@132.png" sizes="32x32" />
          <link
            rel="shortcut icon"
            href="/logos/logo@192.png"
            sizes="192x192"
          />

          <meta name="theme-color" content="#f2f2f2" />
          <meta name="yandex-verification" content="b761a7a26da38d4e" />
        </Head>
        <body
          style={{
            backgroundColor: "var(--bg-white-95)",
          }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
