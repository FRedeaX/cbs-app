import { ButtonBase } from "@mui/material";
import classNames from "classnames";
import { FC, ReactNode, useCallback } from "react";

import { useCarousel } from "../../../../Carousel/Carousel.utils/useCarousel";
import { useGalleryContext } from "../../context";
import classes from "./Gallery.Button.module.css";

type GalleryButtonProps = {
  children: ReactNode;
  className: string;
  index: number;
};

export const GalleryButton: FC<GalleryButtonProps> = ({
  children,
  className,
  index,
}) => {
  const { setToggle } = useGalleryContext();
  const { scrollToIndex } = useCarousel();

  const hendleSetID = useCallback(() => {
    setToggle();
    scrollToIndex(index);
  }, [index, scrollToIndex, setToggle]);

  return (
    <ButtonBase
      className={classNames(classes.root, className)}
      onClick={hendleSetID}
      aria-label="Открыть галерею">
      {children}
    </ButtonBase>
  );
};
