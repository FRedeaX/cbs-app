import classNames from "classnames";
import { createMarkup } from "~/helpers";
import classes from "./Content.module.css";

export const Content = ({ children, cls }) => (
  <div
    // ref={contentRef}
    className={classNames(classes.body, cls)}
    dangerouslySetInnerHTML={createMarkup(children)}
  />
);

// border - top: 1px solid rgba(0, 0, 0, .12);
//     color: rgba(0,0,0,.4);

//картинка
// margin: 20px 0;

// описание картинки
// line-height: 18px;
//     color: rgba(0,0,0,.5);
// font-size: 14px;
// font-weight: 300;
//     font-style: italic;

//h3
// font-weight: 700;
//     margin: 34px 0 6px;
