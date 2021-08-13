export const errorHelper = async (fn, fnError) => {
  try {
    // setTimeout(fn);
    return fn();
  } catch (error) {
    console.error(error);
    // return fnError();
  }
};
