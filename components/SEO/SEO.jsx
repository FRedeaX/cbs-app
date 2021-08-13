import Head from "next/head";

export const SEO = ({ title, description }) => (
  <>
    <Head>
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
