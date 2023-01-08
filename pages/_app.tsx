/* eslint-disable react/jsx-props-no-spreading */
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps as NextAppProps } from "next/app";
import { FC, useEffect } from "react";
import smoothScroll from "smoothscroll-polyfill";

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Overlay from "../components/UI/Overlay/Overlay";
import { client } from "../store/apollo-client";
import "../styles.css";
import { lightTheme } from "../styles/theme/lightTheme";

// interface AppProps extends NextAppProps {
// emotionCache: EmotionCache;
// }

// const clientSideEmotionCache = createEmotionCache();
// const theme = createTheme({}, ruRU);

const App: FC<NextAppProps> = ({
  Component,
  // emotionCache = clientSideEmotionCache,
  pageProps,
  // eslint-disable-next-line arrow-body-style
}) => {
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    window.__forceSmoothScrollPolyfill__ = true;
    smoothScroll.polyfill();
  }, []);

  return (
    <ApolloProvider client={client}>
      {/* <CacheProvider value={emotionCache}> */}
      <ErrorBoundary>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
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
