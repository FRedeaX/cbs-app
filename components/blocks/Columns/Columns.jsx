import gql from "graphql-tag";
import { Column, columnBlockGQL } from "./Column/Column";
import classes from "./Columns.module.css";

export const columnsBlockGQL = {
  fragments: gql`
    fragment columnsBlockGQL on CoreColumnsBlock {
      ... on CoreColumnsBlock {
        name
        innerBlocks {
          ...columnBlockGQL
        }
      }
    }
    ${columnBlockGQL.fragments}
  `,
};

export const Columns = ({ innerBlocks }) => (
  <div className={classes.wrapper}>
    {innerBlocks.map((column, index) => (
      <Column
        key={`${column.name}_${index}`}
        attributes={column.attributes}
        innerBlocks={column.innerBlocks}
      />
    ))}
  </div>
);
