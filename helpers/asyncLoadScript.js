const asyncLoadScript = (src, obj = false) =>
  new Promise((resolve, reject) => {
    if (obj) {
      resolve();
    }
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.addEventListener("load", () => {
      resolve();
    });
    script.addEventListener("error", (e) => {
      reject(e);
    });
    document.body.appendChild(script);
  });

export default asyncLoadScript;
