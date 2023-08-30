type GetImageBlurSvg = {
  width: number;
  height: number;
  blurDataURL: string;
};
export const getImageBlurSvg = ({
  width,
  height,
  blurDataURL,
}: GetImageBlurSvg) => {
  const std = "20";
  const feComponentTransfer = blurDataURL.startsWith("data:image/jpeg")
    ? `%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%`
    : "";
  return `%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E${feComponentTransfer}%3C/filter%3E%3Cimage filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='${blurDataURL}'/%3E%3C/svg%3E`;
};
