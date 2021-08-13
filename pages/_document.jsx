import Document, { Head, Html, Main, NextScript } from "next/document";

class _Document extends Document {
  static async getInitialProps(ctx) {
    // console.log(ctx);
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="shortcut icon" href="/logos/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&amp;display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
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
