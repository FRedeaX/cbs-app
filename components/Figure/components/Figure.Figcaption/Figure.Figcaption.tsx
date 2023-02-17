import classNames from "classnames";
import { FC } from "react";

import { createMarkup } from "../../../../helpers";
import classes from "./Figure.Figcaption.module.css";

type FigureFigcaptionProps = {
  text: string;
  className?: string;

  /**
   * Расположение подписи:
   * - под изображением (outside)
   * - на изображении (inside)
   *
   * @default outside
   */
  position?: "outside" | "inside";

  /**
   * @default false
   */
  isClamp?: boolean;
};

export const FigureFigcaption: FC<FigureFigcaptionProps> = ({
  text,
  className,
  position = "outside",
  isClamp = false,
}) => (
  <figcaption
    className={classNames(
      classes.root,
      classes[`root_${position}`],
      className,
    )}>
    <span
      className={classNames(classes.text, { [classes.text_clamp]: isClamp })}
      dangerouslySetInnerHTML={createMarkup(text)}
    />
  </figcaption>
);
