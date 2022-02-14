import isFront from "../isFront";

const isIntersection =
  isFront &&
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype;

export default isIntersection;
