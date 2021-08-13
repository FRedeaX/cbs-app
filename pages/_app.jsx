import { ApolloProvider } from "@apollo/client";
import smoothscroll from "smoothscroll-polyfill";
import Overlay from "~/components/UI/Overlay/Overlay";
import { isFront } from "~/helpers";
import { client } from "~/store/apollo-client";
import "../styles.css";
// import Script from "next/script";

/* eslint-disable react/jsx-props-no-spreading */
function App({ Component, pageProps }) {
  // const modalRef = useRef();
  // modalVar(modalRef.current);
  if (isFront) smoothscroll.polyfill();

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
      <ApolloProvider client={client}>
        {/* // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Component {...pageProps} />
        {/* <div ref={modalRef} id="modal_root"></div> */}
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
