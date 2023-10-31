import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { AppProps as NextAppProps } from "next/app";
import { FC, useEffect } from "react";
import smoothScroll from "smoothscroll-polyfill";

import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import { lightTheme } from "@/styles/theme/lightTheme";
import "@/styles/fonts/roboto";
import "@/styles/styles.css";
import "@/styles/variables/global.css";
import "@/styles/variables/wp.css";

const App: FC<NextAppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    window.__forceSmoothScrollPolyfill__ = true;
    smoothScroll.polyfill();
  }, []);

  return (
    <ErrorBoundary>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={lightTheme}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </ErrorBoundary>
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
