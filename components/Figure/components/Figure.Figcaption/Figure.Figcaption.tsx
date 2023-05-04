import classNames from "classnames";
import { ElementType, FC } from "react";

import { createMarkup } from "../../../../helpers";
import classes from "./Figure.Figcaption.module.css";

type FigureFigcaptionProps = {
  text: string;
  /**
   * Компонент, используемый для узла оборачиваемого текст.
   * Либо строка для использования HTML-элемента, либо компонент.
   * @default span
   */
  component?: ElementType;
  className?: string;

  /**
   * Расположение подписи:
   * - под `figure` (outside)
   * - поверх `figure` (inside)
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
  component: Component = "span",
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
    <Component
      className={classNames(classes.text, { [classes.text_clamp]: isClamp })}
      dangerouslySetInnerHTML={createMarkup(text)}
    />
  </figcaption>
);
