import classNames from "classnames";
import { FC, ReactNode } from "react";

import classes from "./Suggestion.module.css";

const Suggestion: FC<{
  isSuggest: boolean;
  // aggregationNodes: IBucketsAggregations[] | null | undefined;
  children: ReactNode;
}> = ({ isSuggest, children }) => (
  <div
    className={classNames(classes.block, {
      [classes.block_isVisible]: isSuggest,
    })}>
    {/* <div>
      <Carousel isShadow={false} length={aggregationNodes?.length}>
        <BucketАggregations nodes={aggregationNodes} />
      </Carousel>
    </div> */}
    {children}
  </div>
);

export default Suggestion;
