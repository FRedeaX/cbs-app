import type { NextPage } from "next";

import SEO from "../SEO/SEO";

interface IProps {
  title?: string;
  description?: string;
  image?: string;
  video?: string;
  url?: string;
}

const Head: NextPage<IProps> = ({ title, description, image, video, url }) => (
  <SEO
    title={title}
    description={description}
    image={image}
    video={video}
    url={url}
  />
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
