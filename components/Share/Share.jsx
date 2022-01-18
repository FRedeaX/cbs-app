import classNames from "classnames";

import Social from "../Social/Social";
import classes from "./Share.module.css";

const Share = ({ cls, clsLink, title, href, image, ref }) => {
  let urlVK = `https://vk.com/share.php?url=${href}`;
  let urlOK = `https://connect.ok.ru/offer?url=${href}`;
  let urlFB = `https://www.facebook.com/sharer/sharer.php?u=${href}`;

  // let url = baseUrl;
  // if (title) url = `${url}&title=${title}`;
  // if (image) url = `${url}&image=${image}`;

  if (title) {
    urlVK += `&title=${encodeURIComponent(
      `${title} | Библиотеки города Байконур`,
    )}`;
    urlOK += `&title=${encodeURIComponent(
      `${title} | Библиотеки города Байконур`,
    )}`;
    urlFB += `&title=${encodeURIComponent(
      `${title} | Библиотеки города Байконур`,
    )}`;
  }
  if (image) {
    urlVK += `&image=${encodeURIComponent(image)}`;
    urlOK += `&imageUrl=${encodeURIComponent(image)}`;
    // urlFB += `&image=${encodeURIComponent(image)}`;
  }

  return (
    <div className={classNames(cls, classes.container)} ref={ref}>
      {/* <div className={classes.hover}> */}
      <Social type="vk" url={urlVK} clsLink={clsLink} clsSVG={classes.svg} />
      <Social type="ok" url={urlOK} clsLink={clsLink} clsSVG={classes.svg} />
      <Social type="fb" url={urlFB} clsLink={clsLink} clsSVG={classes.svg} />
      {/* </div> */}
    </div>
  );
};

export default Share;
