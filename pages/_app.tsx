import { ApolloProvider } from "@apollo/client";
import { AppProps as NextAppProps } from "next/app";
import { FunctionComponent, useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Overlay from "../components/UI/Overlay/Overlay";
import { client } from "../store/apollo-client";
import "../styles.css";

interface AppProps extends NextAppProps {
  // emotionCache: EmotionCache;
}

// const clientSideEmotionCache = createEmotionCache();

/* eslint-disable react/jsx-props-no-spreading */
const App: FunctionComponent<AppProps> = ({
  Component,
  // emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <ApolloProvider client={client}>
      {/* <CacheProvider value={emotionCache}> */}
      <ErrorBoundary>
        {/* // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Component {...pageProps} />
      </ErrorBoundary>
      <Overlay />
      {/* </CacheProvider> */}
    </ApolloProvider>
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
