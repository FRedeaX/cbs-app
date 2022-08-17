export const debounce = (callback, delay) => {
  let timeout;
  return (e) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(e);
    }, delay);
  };
};
