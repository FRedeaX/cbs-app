const scrollbarWidth = () => {
  if (typeof window === "undefined") return;
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  document.body.style.setProperty("--scrollbarWidth", `${scrollbarWidth}px`);
};
export default scrollbarWidth;

// (function () {
//   if (typeof window === "undefined") return;
//   const outer = document.createElement("div");
//   outer.style.visibility = "hidden";
//   outer.style.overflow = "scroll";
//   document.body.appendChild(outer);
//   const inner = document.createElement("div");
//   outer.appendChild(inner);
//   const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
//   outer.parentNode.removeChild(outer);
//   document.body.style.setProperty("--scrollbarWidth", `${scrollbarWidth}px`);
// })();
