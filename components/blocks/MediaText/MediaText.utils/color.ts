type styleColor = {
  color: {
    text: string;
  };
};

interface IColor {
  textColor: string;
  style: string | null;
}

export const color = ({ textColor, style }: IColor): string => {
  if (textColor !== "") return `var(--${textColor}) !impotent`;
  if (style !== null) {
    const { color: _color }: styleColor = JSON.parse(style);
    if (_color) return _color.text;
  }
  return "";
};
