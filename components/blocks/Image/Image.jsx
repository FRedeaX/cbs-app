import ImageNext from "next/image";

import classes from "./Image.module.css";

const Image = ({ alt, url, width, height }) => (
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

export default Image;
