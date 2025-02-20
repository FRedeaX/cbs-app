import classNames from "classnames";

import Social from "../Social/Social";

import classes from "./Share.module.css";

const Share = ({ cls, clsLink, title, href, image }) => {
  let urlVK = `https://vk.com/share.php?url=${href}`;
  let urlOK = `https://connect.ok.ru/offer?url=${href}`;

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
  }
  if (image) {
    urlVK += `&image=${encodeURIComponent(image)}`;
    urlOK += `&imageUrl=${encodeURIComponent(image)}`;
  }

  return (
    <div className={classNames(cls, classes.container)}>
      {/* <div className={classes.hover}> */}
      <Social type="vk" url={urlVK} clsLink={clsLink} clsSVG={classes.svg} />
      <Social type="ok" url={urlOK} clsLink={clsLink} clsSVG={classes.svg} />
      {/* </div> */}
    </div>
  );
};

export default Share;
