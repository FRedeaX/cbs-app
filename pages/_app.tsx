import { ApolloProvider } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import type { NextAppProps } from "next/app";
import { FunctionComponent, useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Overlay from "../components/UI/Overlay/Overlay";
import { client } from "../store/apollo-client";
import createEmotionCache from "../store/mui/createEmotionCache";
import "../styles.css";

interface AppProps extends NextAppProps {
  emotionCache: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

/* eslint-disable react/jsx-props-no-spreading */
const App: FunctionComponent<AppProps> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      {/* <Script>{smoothscroll.polyfill()}</Script> */}
      <ApolloProvider client={client}>
        <ErrorBoundary>
          {/* // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Component {...pageProps} />
        </ErrorBoundary>
        <Overlay />
      </ApolloProvider>
    </CacheProvider>
  );
};

// App.getInitialProps = async ({ Component, ctx }) => {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   return {
//     pageProps,
//     menus, //: data.menus.nodes,
//   };
// };

export default App;
