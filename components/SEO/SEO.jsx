import Head from "next/head";

const SEO = ({ title, description, image, video, url }) => {
  const fullTitle = title
    ? `${title} | Библиотеки города Байконур`
    : "Библиотеки города Байконур";

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
      <meta
        property="og:site_name"
        content="Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур"
      />
    </Head>
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
