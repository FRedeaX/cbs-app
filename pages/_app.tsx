import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Overlay from "../components/UI/Overlay/Overlay";
import { client } from "../store/apollo-client";
import "../styles.css";

/* eslint-disable react/jsx-props-no-spreading */
function App({ Component, pageProps }): AppProps {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <>
      {/* <Script>{smoothscroll.polyfill()}</Script> */}
      <ApolloProvider client={client}>
        <ErrorBoundary>
          {/* // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Component {...pageProps} />
        </ErrorBoundary>
        <Overlay />
      </ApolloProvider>
    </>
  );
}

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
