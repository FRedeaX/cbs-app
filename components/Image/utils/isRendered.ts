export const isRendered = (element: HTMLImageElement) => {
  const { naturalWidth, naturalHeight } = element;

  return naturalWidth > 0 && naturalHeight > 0;
};
