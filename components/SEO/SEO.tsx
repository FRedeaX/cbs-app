import Head from "next/head";
import { FC } from "react";

type Video = {
  id: string;
  href: string;
};

type SEOProp = {
  domenTitle: string;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  video?: Video[];
};

export const SEO: FC<SEOProp> = ({
  domenTitle,
  title,
  description,
  url,
  image,
  video,
}) => {
  const fullTitle = title ? `${title} | ${domenTitle}` : domenTitle;

  return (
    <Head>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      {video &&
        video.length > 0 &&
        video.map(({ id, href }) => (
          <meta key={id} property="og:video" content={href} />
        ))}
      <meta property="og:site_name" content={domenTitle} />
    </Head>
  );
};
