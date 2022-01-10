import { gql } from "@apollo/client";

// eslint-disable-next-line import/no-cycle
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
        // eslint-disable-next-line react/no-array-index-key
        key={`${column.name}_${index}`}
        attributes={column.attributes}
        innerBlocks={column.innerBlocks}
      />
    ))}
  </div>
);
