/* eslint-disable @next/next/no-script-in-head */
import Head from "next/head";
import Script from "next/script";

// import scrollbarWidth from "~/public/scripts/scrollbarWidth";

const SEO = ({ title, description, image, video, url }) => {
  const fullTitle = title
    ? `${title} | Библиотеки города Байконур`
    : "Библиотеки города Байконур";

  return (
    <>
      <Head>
        <Script
          id="scrollbarWidth"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: (function scrollWidth() {
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
                `${scrollbarWidth}px`,
              );
            })(),
          }}
        />

        <title>{fullTitle}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        {image && <meta property="og:image" content={image} />}
        {video &&
          video.length > 0 &&
          video.map(({ id, href }) => (
            <meta key={id} property="og:video" content={href} />
          ))}
        <meta
          property="og:site_name"
          content="Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур"
        />
      </Head>
    </>
  );
};

export default SEO;

/* <meta property="twitter:description" content={description} /> */
/* <Head>
  <title>{`${title} | ${siteTitle}`}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={siteTitle} />
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:creator" content={config.social.twitter} />
  <meta property="twitter:title" content={title} />
</Head>; */
