import asyncLoadScript from "./asyncLoadScript";
import createMarkup from "./createMarkup";
import delay from "./delay";
import isFront from "./isFront";
import lineClamp from "./lineClamp";
import * as localStorage from "./localStorage";
import throttler from "./throttler";
import verticalAlignToFlext from "./verticalAlignToFlext";

export {
  asyncLoadScript,
  createMarkup,
  delay,
  isFront,
  lineClamp,
  throttler,
  verticalAlignToFlext,
  localStorage,
};

// export const scrollbarWidth = () => {
//   if (typeof window === "undefined") return;
//   // outer.style.msOverflowStyle = "scrollbar";
//   const outer = document.createElement("div");
//   outer.style.visibility = "hidden";
//   outer.style.overflow = "scroll";
//   document.body.appendChild(outer);
//   const inner = document.createElement("div");
//   outer.appendChild(inner);
//   const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
//   outer.parentNode.removeChild(outer);
//   return scrollbarWidth;
//   // document.body.style.setProperty("--scrollbarWidth", `${scrollbarWidth}px`);
// };
