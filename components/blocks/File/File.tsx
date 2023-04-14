import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { Button, IconButton, Tooltip } from "@mui/material";
import classNames from "classnames";
import { FC } from "react";

import { Nullable } from "../../../helpers/typings/utility-types";
import { SeparationDot } from "../../SeparationDot/SeparationDot";
import { Paragraph } from "../Paragraph/Paragraph";
import { HorizontalAlign } from "../utils/types";
import classes from "./File.module.css";

type FileProps = {
  /**
   * Горизонтальное выравнивание содержимого.
   */
  align?: HorizontalAlign;
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Отображение документа в HTML-элементе `object`.
   */
  displayPreview?: boolean;
  /**
   * Высота HTML-элемента `object`.
   * @default 600
   */
  previewHeight?: number;
  /**
   * Имя файла.
   */
  fileName: string;
  /**
   * Ссылка на файл.
   */
  href: string;
  /**
   * Размер файла.
   */
  fileSize?: Nullable<string>;
  /**
   * Показать кнопку скачивания.
   */
  showDownloadButton?: boolean;
  /**
   * Атрибут `target`
   * @default '_blank'
   */
  textLinkTarget?: "_self" | "_blank" | "_parent" | "_top";
  /**
   * Дополнительный класс.
   */
  className: string | classNames.ArgumentArray;
};

export const File: FC<FileProps> = ({
  align,
  anchor,
  fileName,
  href,
  fileSize,
  textLinkTarget = "_blank",
  showDownloadButton,
  displayPreview,
  previewHeight = 600,
  className,
}) => {
  const titleFileSize = fileSize ? `, размер файла ${fileSize}` : "";

  return (
    <div
      id={anchor || undefined}
      className={classNames(classes.root, className)}>
      <div
        className={classNames(
          classes.wrapper,
          classes[`wrapper_align_${align}`],
        )}>
        <Button
          href={href}
          target={textLinkTarget}
          className={classes.button}
          startIcon={<InsertDriveFileRoundedIcon />}>
          <div>
            <Paragraph component="span" className={classes.buttonText}>
              {fileName}
            </Paragraph>
            {fileSize && (
              <span className={classes.buttonFileSize}>
                <SeparationDot />
                <Paragraph component="span" aria-hidden>
                  {fileSize}
                </Paragraph>
              </span>
            )}
          </div>
        </Button>
        {showDownloadButton && (
          <Tooltip title={`Скачать "${fileName}"${titleFileSize}`} arrow>
            <IconButton
              className={classes.buttonDownload}
              href={href}
              download
              target="_blank">
              <ArrowDownwardRoundedIcon />
            </IconButton>
          </Tooltip>
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
};
