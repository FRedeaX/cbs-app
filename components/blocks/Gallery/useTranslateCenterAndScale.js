const useTranslateCenterAndScale = (image) => {
  // useEffect(() => {
  //   if (isOpen) {
  //   } else {
  //   }
  // }, [isOpen]);

  // const getTranslate = () => {
  const getTranslate = () => {
    const { clientWidth } = document.documentElement;
    const { clientHeight } = document.documentElement;
    const imageX = image.x + image.clientWidth / 2;
    const imageY = image.y + image.clientHeight / 2;
    const centerX = clientWidth / 2 - imageX;
    const centerY = clientHeight / 2 - imageY;
    let scale = // height < width || clientHeight > clientWidth
      //   ?
      (clientWidth / image.clientWidth)
        // : clientHeight / image.clientHeight
        .toString()
        .substr(0, 3);

    if (scale > 1.6) scale = 1.6;
    return `translate(${centerX}px, ${centerY}px) scale(${scale})`;
  };
  return { getTranslate };
};

export default useTranslateCenterAndScale;
