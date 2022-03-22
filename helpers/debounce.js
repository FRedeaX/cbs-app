export default function debounce(callback, delay) {
  let timeout;
  return function (e) {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(e);
    }, delay);
  };
}
