/* eslint-disable react/no-array-index-key */
import {
  Table as MUITable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableRowProps,
  Typography,
} from "@mui/material";
import classNames from "classnames";
import { FC } from "react";

import { createMarkup } from "../../../helpers";
import { Nullable } from "../../../helpers/typings/utility-types";
import { parseBlockStyle } from "../utils/parseBlockStyle";
import { Color, FontSize, Gradient } from "../utils/types";
import classes from "./Table.module.css";
import { Cell } from "./utils/tableGQL";

export type TableProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Подпись.
   */
  caption?: string;
  /**
   * Ячейки таблицы фиксированной ширины.
   * @default false
   */
  hasFixedLayout?: boolean;
  head: { cells: Cell[] }[];
  body: { cells: Cell[] }[];
  foot: { cells: Cell[] }[];

  backgroundColor?: Color;
  borderColor?: Color;
  fontSize?: FontSize;
  gradient?: Gradient;
  textColor?: Color;
  style?: Nullable<string>;
  /**
   * Дополнительный класс.
   */
  className?: string;
} & Pick<TableRowProps, "selected">;

export const Table: FC<TableProps> = ({
  anchor,
  caption,
  hasFixedLayout = false,
  head,
  body,
  foot,
  selected,
  backgroundColor,
  borderColor,
  fontSize,
  gradient,
  textColor,
  style,
  className,
}) => {
  const styleDiv = parseBlockStyle({
    backgroundColor,
    borderColor,
    fontSize,
    gradient,
    textColor,
    style,
  });

  return (
    <div id={anchor || undefined} style={styleDiv} className={className}>
      <TableContainer component={Paper}>
        <MUITable
          className={classNames(classes.MUITable, {
            [classes.MUITable_layout_fixed]: hasFixedLayout,
          })}>
          {caption && <caption>{caption}</caption>}
          <TableHead className={classes.TableHead}>
            {head.map((row, rowIndex) => (
              <TableRow key={`hrow_${rowIndex}`}>
                {row.cells.map((cell, cellIndex) => (
                  <TableCell
                    key={`hcell_${cellIndex}`}
                    align={cell.align || "center"}>
                    <Typography
                      variant="responsiveText"
                      component="span"
                      dangerouslySetInnerHTML={createMarkup(cell.content)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody className={classes.TableBody}>
            {body.map((row, rowIndex) => (
              <TableRow
                key={`row_${rowIndex}`}
                hover={!selected}
                selected={selected && Boolean((rowIndex + 1) % 2)}>
                {row.cells.map((cell, cellIndex) => (
                  <TableCell
                    key={`cell_${cellIndex}`}
                    align={cell.align || undefined}>
                    <Typography
                      variant="responsiveText"
                      component="span"
                      dangerouslySetInnerHTML={createMarkup(cell.content)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {foot.map((row, rowIndex) => (
              <TableRow key={`frow_${rowIndex}`}>
                {row.cells.map((cell, cellIndex) => (
                  <TableCell
                    key={`fcell_${cellIndex}`}
                    align={cell.align || undefined}>
                    <Typography
                      variant="responsiveText"
                      component="span"
                      dangerouslySetInnerHTML={createMarkup(cell.content)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </MUITable>
      </TableContainer>
    </div>
  );
};
