function scrollbarWidth(): string {
  if (typeof window === "undefined") return "";
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const carrentScrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  document.body.style.setProperty(
    "--scrollbar-width",
    `${carrentScrollbarWidth}px`,
  );
  return "";
}

export default scrollbarWidth;
