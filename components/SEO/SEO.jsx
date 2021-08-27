import Head from "next/head";
import Script from "next/script";
// import scrollbarWidth from "~/public/scripts/scrollbarWidth";

export const SEO = ({ title, description }) => (
  <>
    <Head>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: (function () {
            if (typeof window === "undefined") return;
            const outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.overflow = "scroll";
            document.body.appendChild(outer);
            const inner = document.createElement("div");
            outer.appendChild(inner);
            const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
            outer.parentNode.removeChild(outer);
            document.body.style.setProperty(
              "--scrollbarWidth",
              `${scrollbarWidth}px`
            );
          })(),
        }}
      />
      {/* <Script strategy="afterInteractive" src={scrollbarWidth} /> */}
      {/* <script type="text/javascript" src="/scripts/scrollbarWidth.js"></script> */}
      {/* dangerouslySetInnerHTML={{
    __html:``}} */}

      <title>
        {title
          ? `${title} | Библиотеки города Байконур`
          : "Библиотеки города Байконур"}
      </title>
      <meta name="description" content={description} />
    </Head>
  </>
);

{
  /* <Head>
  <title>{`${title} | ${siteTitle}`}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={siteTitle} />
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:creator" content={config.social.twitter} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
</Head>; */
}

{
  /* <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?display=swap&amp;family=Public%20Sans%3Aital%2Cwght%400%2C100..900%3B1%2C100..900&amp;subset=latin%2Clatin-ext"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?display=swap&amp;family=Public%20Sans%3Aital%2Cwght%400%2C100..900%3B1%2C100..900&amp;subset=latin%2Clatin-ext"
        type="text/css"
        media="all"
      /> */
}
