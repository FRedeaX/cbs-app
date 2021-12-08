import { default as ImageNext } from "next/image";
import classes from "./Image.module.css";

export const Image = ({ alt, url, width, height }) => {
  return (
    <ImageNext
      src={url}
      alt={alt}
      width={width}
      height={height}
      // blurDataURL={base64}
      // placeholder="blur"
      className={classes.image}
    />
  );
};
