const redirect = (argsSource, toDestination) =>
  argsSource.map((source) => ({
    source,
    destination: toDestination,
    permanent: true,
  }));
module.exports.redirect = redirect;
