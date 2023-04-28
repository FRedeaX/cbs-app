import {
  CSSProperties,
  Nullable,
} from "../../../helpers/typings/utility-types";
import { BlockCustomStyle, Color, FontSize, Gradient } from "./types";

type GetBackground = {
  backgroundColor?: Color;
  gradient?: Gradient;
  textColor?: Color;
  borderColor?: Color;
  fontSize?: FontSize;
  /**
   * JSON
   * @see BlockCustomStyle
   */
  style?: Nullable<string>;

  /**
   * @default backgroundColor
   */
  styleBackground?: "backgroundColor" | "color";
};

type Style = Pick<
  CSSProperties,
  | "backgroundColor"
  | "color"
  | "borderColor"
  | "borderRadius"
  | "borderStyle"
  | "borderWidth"
  | "--typography-font-size"
  | "--typography-font-weight"
  | "--typography-font-style"
  | "--typography-text-decoration"
  | "--typography-text-transform"
  | "--typography-letter-spacing"
>;

export const parseBlockStyle = ({
  backgroundColor,
  gradient,
  textColor,
  borderColor,
  fontSize,
  style,
  styleBackground = "backgroundColor",
}: GetBackground): Style => {
  const styles: Style = {};

  if (style) {
    const { color, border, typography }: BlockCustomStyle = JSON.parse(style);

    if (color) {
      styles[styleBackground] = color.background || color.gradient;
      styles.color = color.text;
    }

    if (border) {
      styles.borderColor = border.color;
      styles.borderRadius = border.radius;
      styles.borderStyle = border.style || "solid";
      styles.borderWidth = border.width;
    }

    if (typography) {
      styles["--typography-font-size"] = typography.fontSize;
      styles["--typography-font-style"] = typography.fontStyle;
      styles["--typography-font-weight"] = typography.fontWeight;
      styles["--typography-text-transform"] = typography.textTransform;
      styles["--typography-text-decoration"] = typography.textDecoration;
      styles["--typography-letter-spacing"] = typography.letterSpacing;
    }
  }

  const backgroundColorOrGradient = backgroundColor || gradient;
  if (backgroundColorOrGradient) {
    styles[
      styleBackground
    ] = `var(--wp--preset--color--${backgroundColorOrGradient})`;
  }

  if (textColor) {
    styles.color = `var(--wp--preset--color--${textColor})`;
  }

  if (borderColor) {
    styles.borderColor = `var(--wp--preset--color--${borderColor})`;
  }

  if (fontSize) {
    styles[
      "--typography-font-size"
    ] = `var(--wp--preset--font-size--${fontSize})`;
  }

  return styles;
};
