import { FC } from "react";

import { SpacerBlockAttributes } from "./utils/spacerGQL";

export const Spacer: FC<SpacerBlockAttributes> = ({ height }) => (
  <div style={{ height }} aria-hidden="true" />
);
