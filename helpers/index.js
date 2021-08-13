export const asyncLoadScript = (src, obj = false) => {
  return new Promise((resolve, reject) => {
    if (obj) {
      return resolve();
    }
    let script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.addEventListener("load", function () {
      resolve();
    });
    script.addEventListener("error", function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  });
};

export const isFront = typeof window !== "undefined";

export function createMarkup(text) {
  return { __html: text };
}

export const verticalAlignToFlext = (align) => {
  if (align === "left" || align === "top") return "flex-start";
  else if (align === "right" || align === "bottom") return "flex-end";
  else return align;
};

export const scrollbarWidth = () => {
  // outer.style.msOverflowStyle = "scrollbar";
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};

let timeout;
export const throttler = (func) => {
  if (!timeout) {
    timeout = setTimeout(function () {
      timeout = null;
      func();
    }, 66);
  }
};

// export const mapInit = () =>
//   new Promise((resolve, reject) => {
//     let zoom = 14;
//     let center = [45.6246, 63.308];
//     const FOCUS_ZOOM = 17;
//     if (window.matchMedia("(max-width: 446px)").matches) {
//       zoom = 13;
//       center = [45.626, 63.308];
//     }
//     const map = new window.ymaps.Map("map", {
//       center,
//       zoom,
//       controls: ["zoomControl"],
//     });
//     console.log("11", map);
//     resolve(...map);

//     if (map === undefined) reject();
//   });
