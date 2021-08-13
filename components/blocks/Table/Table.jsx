import classNames from "classnames";
import gql from "graphql-tag";
import { Row } from "./Row/Row";
import classes from "./Table.module.css";

export const tableBlockGQL = {
  fragments: gql`
    fragment tableBlockGQL on CoreTableBlock {
      ... on CoreTableBlock {
        attributes {
          ... on CoreTableBlockAttributes {
            className
            hasFixedLayout
            backgroundColor
            head {
              cells {
                align
                content
              }
            }
            body {
              cells {
                align
                content
              }
            }
            foot {
              cells {
                align
                content
              }
            }
          }
        }
      }
    }
  `,
};

export const Table = ({
  className,
  hasFixedLayout,
  backgroundColor,
  head,
  body,
  foot,
}) => (
  <div className={classes.block}>
    <table
      className={classNames(classes.wrapper, {
        [classes["fixed-layout"]]: hasFixedLayout,
        // [classes[`align_${textAlign}`]]:
        //   textAlign !== "" && textAlign !== "left",
        [classes["style-stripes"]]: className === "is-style-stripes",
      })}
      style={{
        backgroundColor: backgroundColor ? `var(--${backgroundColor})` : "",
      }}
    >
      {head[0] && (
        <thead>
          <tr>
            <Row
              array={head[0].cells}
              Tag={"th"}
              className={classNames(classes.cells, classes["cells_th"])}
            />
          </tr>
        </thead>
      )}
      <tbody>
        {body.map((row, index) => (
          <tr key={index} className={classes["row_tr"]}>
            <Row array={row.cells} className={classes.cells} />
          </tr>
        ))}
      </tbody>
      {foot[0] && (
        <tfoot>
          <tr>
            <Row
              array={foot[0].cells}
              className={classNames(classes.cells, classes["cells_tf"])}
            />
          </tr>
        </tfoot>
      )}
    </table>
  </div>
);
