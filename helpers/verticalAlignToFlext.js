const verticalAlignToFlext = (align) => {
  if (align === "left" || align === "top") return "flex-start";
  if (align === "right" || align === "bottom") return "flex-end";
  return align;
};

export default verticalAlignToFlext;
