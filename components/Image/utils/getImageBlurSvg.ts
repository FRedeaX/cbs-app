/* eslint-disable no-nested-ternary */
import { CSSProperties } from "@/helpers/typings/utility-types";

type GetImageBlurSvg = {
  width?: number;
  height?: number;
  blurDataURL: string;
  objectFit?: CSSProperties["objectFit"];
};
export function getImageBlurSvg(param: GetImageBlurSvg) {
  const { width, height, blurDataURL, objectFit } = param;
  const std = 40;
  const viewBox = width && height ? `viewBox='0 0 ${width} ${height}'` : "";
  const preserveAspectRatio = viewBox
    ? "none"
    : objectFit === "contain"
    ? "xMidYMid"
    : objectFit === "cover"
    ? "xMidYMid slice"
    : "none";

  return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${viewBox}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${preserveAspectRatio}' style='filter: url(%23b);' href='${blurDataURL}'/%3E%3C/svg%3E`;
}
