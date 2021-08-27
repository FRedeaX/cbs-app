import Document, { Head, Html, Main, NextScript } from "next/document";
// import Script from "next/script";
// import { scrollbarWidth } from "~/helpers";

class _Document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="shortcut icon" href="/logos/favicon.ico" />
          {/* <link rel="preconnect" href="https://fonts.googleapis.com"> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;500;600;700&display=swap"
            rel="stylesheet"
          />
          <meta name="yandex-verification" content="b761a7a26da38d4e" />

          {/* <style>
            {`@media screen and (max-width: 768px) {
              .body {
                --scrollbarWidth: 0;
                padding: 20px;
              }
            }`}
          </style> */}
        </Head>
        <body
          style={{
            backgroundColor: "var(--bgWhite)",
            // "--scrollbarWidth":
            //   typeof window !== "undefined" &&
            //   window.matchMedia("(max-width: 768px)").matches
            //     ? 0
            //     : "17px",
          }}
        >
          <Main />
          <NextScript />
          {/* <div
            style={{ visibility: "hidden", overflow: "scroll" }}
            id="scrollW"
            >
            <div />
          </div> */}
        </body>
      </Html>
    );
  }
}

export default _Document;
