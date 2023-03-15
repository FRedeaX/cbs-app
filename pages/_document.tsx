import Document, { Head, Html, Main, NextScript } from "next/document";

class _Document extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          {/* {this.props.styles} */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://mc.yandex.ru/" />
          <link rel="preconnect" href="https://www.googletagmanager.com/" />

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
            "--is-header-fixed": 1,
          }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// _Document.getInitialProps = async (ctx) => {
//   const originalRenderPage = ctx.renderPage;

//   // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
//   // However, be aware that it can have global side effects.
//   const cache = createEmotionCache();
//   const { extractCriticalToChunks } = createEmotionServer(cache);

//   /* eslint-disable */
//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) =>
//         function EnhanceApp(props) {
//           return <App emotionCache={cache} {...props} />;
//         },
//     });
//   /* eslint-enable */

//   const initialProps = await Document.getInitialProps(ctx);

//   const emotionStyles = extractCriticalToChunks(initialProps.html);
//   const emotionStyleTags = emotionStyles.styles.map((style) => (
//     <style
//       data-emotion={`${style.key} ${style.ids.join(" ")}`}
//       key={style.key}
//       // eslint-disable-next-line react/no-danger
//       dangerouslySetInnerHTML={{ __html: style.css }}
//     />
//   ));

//   return {
//     ...initialProps,
//     styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
//   };
// };

export default _Document;
