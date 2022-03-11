/* eslint-disable @next/next/no-script-in-head */
import type { NextPage } from "next";

import NHead from "next/head";
import Script from "next/script";
import SEO from "../SEO/SEO";

interface IProps {
  title?: string;
  description: string;
  image?: string;
  video?: string;
  url?: string;
}

const Head: NextPage<IProps> = ({ title, description, image, video, url }) => (
  <>
    <NHead>
      <Script
        id="scrollbarWidth"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function scrollWidth() {
            if (typeof window === "undefined") return;
            const outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.overflow = "scroll";
            document.body.appendChild(outer);
            const inner = document.createElement("div");
            outer.appendChild(inner);
            const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
            outer.parentNode?.removeChild(outer);
            document.body.style.setProperty(
              "--scrollbarWidth",
              scrollbarWidth + "px"
            );
          })()`,
        }}
      />
    </NHead>
    <SEO
      title={title}
      description={description}
      image={image}
      video={video}
      url={url}
    />
  </>
);

export default Head;

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
