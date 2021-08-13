export const getLocalStorage = (key) =>
  new Promise((resolve, reject) => {
    const storage = JSON.parse(window.localStorage.getItem(key));
    if (storage) resolve(storage);
    else reject();
  });

export const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
