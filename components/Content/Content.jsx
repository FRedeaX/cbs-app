/* eslint-disable arrow-body-style */
// import classNames from "classnames";
import { createMarkup } from "../../helpers";

// import { fetchHeader } from "../../store/action/header";
// import "./Content.css";

const Content = ({ content, cls }) => {
  // const cx = classNamesBind.bind(classes);
  // console.log("2", content);

  return (
    <div
      // ref={contentRef}
      className="content-body"
      dangerouslySetInnerHTML={createMarkup(content)}
    />
  );
};

export default Content;
