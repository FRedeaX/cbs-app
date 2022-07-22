import { isFront } from "..";

const isIntersection: boolean =
  isFront &&
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype;

export default isIntersection;
