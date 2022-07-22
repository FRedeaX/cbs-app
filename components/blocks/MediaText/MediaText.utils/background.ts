type styleColor = {
  color: {
    background: string;
    gradient: string;
  };
};

interface IBackground {
  backgroundColor: string;
  gradient: string;
  style: string | null;
}

export const background = ({
  backgroundColor,
  gradient,
  style,
}: IBackground): string => {
  if (backgroundColor !== "") return `var(--${backgroundColor})`;
  if (gradient !== "") {
    const color = gradient.split("-to-");
    if (color.length > 1)
      return `linear-gradient(135deg, var(--${color[0]}), var(--${color[1]}))`;
  } else if (style !== null) {
    const { color }: styleColor = JSON.parse(style);
    if (color) return color.background || color.gradient;
  }
  return "";
};
