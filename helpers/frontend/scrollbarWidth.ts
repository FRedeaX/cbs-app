export const scrollbarWidth = (): void => {
  if (typeof window === "undefined") return;

  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const currentScrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  document.body.style.setProperty(
    "--scrollbar-width",
    `${currentScrollbarWidth}px`,
  );
};
