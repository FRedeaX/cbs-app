import { memo } from "react";

import Card from "../../Widget/Card/Card/Card";

const СardListUngrouped = ({ data }) =>
  data.map((node, index) => (
    <Card key={node.id} data={node} horizontal imagePriority={index < 3} />
  ));

export default memo(СardListUngrouped);
