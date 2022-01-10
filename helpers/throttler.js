let timeout;
const throttler = (func, t = 66) => {
  if (!timeout) {
    timeout = setTimeout(() => {
      timeout = null;
      func();
    }, t);
  }
};

export default throttler;
