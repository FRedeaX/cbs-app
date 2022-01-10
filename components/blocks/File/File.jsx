import { gql } from "@apollo/client";
import classNames from "classnames";
import Link from "next/link";

import Button from "../../UI/Button/Button";
import Icon from "../../UI/Icon/Icon";
import classes from "./File.module.css";

export const fileBlockGQL = {
  fragments: gql`
    fragment fileBlockGQL on CoreFileBlock {
      ... on CoreFileBlock {
        attributes {
          align
          anchor
          className
          displayPreview
          fileName
          href
          previewHeight
          showDownloadButton
          textLinkTarget
        }
      }
    }
  `,
};

export const File = ({
  className,
  fileName,
  href,
  showDownloadButton,
  textLinkTarget,
  displayPreview,
  previewHeight,
}) => (
  <div
    style={{ marginBottom: displayPreview ? "20px" : "" }}
    className={classNames(classes.block, className)}>
    <div className={classes.header}>
      <Link href={href} passHref>
        <Button view="link" className={classes.link} target={textLinkTarget}>
          {fileName}
        </Button>
      </Link>
      {showDownloadButton && (
        <Button
          className={classes.button_download}
          href={href}
          view="download"
          icon={<Icon type="download" side={false} />}
          ariaLabel={`Скачать ${fileName}`}
        />
      )}
    </div>
    {displayPreview && (
      <object
        style={{ height: previewHeight }}
        className={classes.preview}
        data={href}
      />
    )}
  </div>
);
