import { ApolloProvider } from "@apollo/client";
import { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";
import Overlay from "~/components/UI/Overlay/Overlay";
import { ErrorBoundary } from "~/components/ErrorBoundary/ErrorBoundary";
import { client } from "~/store/apollo-client";
import "../styles.css";
import Script from "next/script";

/* eslint-disable react/jsx-props-no-spreading */
function App({ Component, pageProps }) {
  // const modalRef = useRef();
  // modalVar(modalRef.current);
  // if (isFront) smoothscroll.polyfill();
  useEffect(() => {
    smoothscroll.polyfill();
    //   // const _scrollbarWidth = scrollbarWidth();
    //   // if (_scrollbarWidth !== 17)
    //   //   document.body.style.setProperty(
    //   //     "--scrollbarWidth",
    //   //     `${_scrollbarWidth}px`
    //   //   );
  }, []);

  return (
    <>
      {/* <Script>
        {`${(function (d, t) {
          if (d === null) return null;
          var e = d.createElement(t),
            i = d.createElement(t);
          e.style.visibility = "hidden";
          e.style.overflow = "scroll";
          d.body.appendChild(e);
          e.appendChild(i);
          d.documentElement.style.setProperty(
            "--scrollbarWidth",
            `${e.offsetWidth - i.offsetWidth}px`
          );
          d.body.removeChild(e);
        })(isFront ? document : null, "div")}`}
      </Script> */}
      {/* <Script>{smoothscroll.polyfill()}</Script> */}
      <ApolloProvider client={client}>
        <ErrorBoundary>
          {/* // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Component {...pageProps} />
          {/* <div ref={modalRef} id="modal_root"></div> */}
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
