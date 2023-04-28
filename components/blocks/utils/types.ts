export type Color =
  | "black"
  | "cyan-bluish-gray"
  | "white"
  | "pale-pink"
  | "vivid-red"
  | "luminous-vivid-orange"
  | "luminous-vivid-amber"
  | "light-green-cyan"
  | "vivid-green-cyan"
  | "pale-cyan-blue"
  | "vivid-cyan-blue"
  | "vivid-purple";

export type Gradient =
  | "vivid-cyan-blue-to-vivid-purple"
  | "light-green-cyan-to-vivid-green-cyan"
  | "luminous-vivid-amber-to-luminous-vivid-orange"
  | "luminous-vivid-orange-to-vivid-red"
  | "very-light-gray-to-cyan-bluish-gray"
  | "cool-to-warm-spectrum"
  | "blush-light-purple"
  | "blush-bordeaux"
  | "luminous-dusk"
  | "pale-ocean"
  | "electric-grass"
  | "midnight";

export type BlockCustomStyle = {
  color?: {
    text?: string;
    background?: string;
    gradient?: string;
  };
  border?: {
    radius?: string;
    color?: string;
    style?: string;
    width?: string;
  };
  typography?: {
    textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
    textDecoration?: "none" | "underline" | "line-through";
    fontSize?: string;
    fontStyle?: string;
    fontWeight?: string;
    letterSpacing?: string;
  };
};

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type FontSize = "small" | "medium" | "large" | "x-large";
export type HorizontalAlign = "left" | "center" | "right";
export type VerticalAlignment = "top" | "center" | "bottom";

export type ListType = "a" | "A" | "i" | "I" | "1";

// Pick<HorizontalAlign, "left" | "right">
// Ошибка: Тип ""left" | "right"" не удовлетворяет ограничению "number
// | unique symbol | "toString" | "charAt" | "charCodeAt" | "concat"
// | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace"
// | "search" | "slice" | "split" | "substring" | ... 35 more ... | "at"".
export type HorizontalMediaAlign = "left" | "right";

export type AlignImage = HorizontalAlign;
