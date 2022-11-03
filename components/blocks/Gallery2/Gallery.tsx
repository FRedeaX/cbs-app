import { FC } from "react";

type Image = {
  id: string;
  alt: string;
  url: string;
  width: number;
  height: number;
};
type GalleryProps = {
  images: Image[];
};

export const Gallery: FC<GalleryProps> = ({ images }) => {
  console.log(images);

  return <div></div>;
};
