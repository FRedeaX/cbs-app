interface IBlockWidth {
  mediaWidth: number;
  isFloat: boolean;
}

export interface IBlockWidthResult {
  media: {
    flex?: number;
    width?: string;
  };
  text?: { flex?: number };
  mediaType: "flex" | "float";
}

export const getBlockWidth = ({
  mediaWidth,
  isFloat,
}: IBlockWidth): IBlockWidthResult => {
  if (isFloat) {
    return {
      media: {
        width: `${mediaWidth}%`,
      },
      mediaType: "float",
    };
  }

  return {
    media: { flex: mediaWidth / 10 },
    text: { flex: (100 - mediaWidth) / 10 },
    mediaType: "flex",
  };
};
