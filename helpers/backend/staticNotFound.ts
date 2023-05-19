type StaticNotFound = { notFound: true; revalidate?: number | boolean };

export const staticNotFound: StaticNotFound = {
  notFound: true,
  revalidate: true,
};
