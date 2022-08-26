import { gql } from "@apollo/client";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import { createMarkup } from "../../../helpers";
import classes from "./Paragraph.module.css";

export const paragraphBlockGQL = {
  fragments: gql`
    fragment paragraphBlockGQL on CoreParagraphBlock {
      ... on CoreParagraphBlock {
        name
        attributes {
          ... on CoreParagraphBlockAttributes {
            align
            anchor
            className
            content
            textColor
          }
        }
      }
    }
  `,
};

interface IParagraph {
  align?: "" | "left" | "center" | "right";
  anchor?: "string";
  className?: "string";
  children: ReactNode;
  content?: "string";
}

export const Paragraph: FC<IParagraph> = ({
  align,
  anchor,
  className,
  children,
  content,
}) => (
  <p
    className={classNames(
      classes.block,
      {
        [classes[`align_${align}`]]:
          align !== undefined && align !== "" && align !== "left",
      },
      className,
    )}
    id={anchor}
    dangerouslySetInnerHTML={createMarkup(children || content)}
  />
);
