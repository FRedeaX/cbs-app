import { memo } from "react";

import Card from "../Card/Card";

const PostNotGroupCards = ({ data }) =>
  data.map((post, index) => (
    <Card key={post.id} data={post} horizontal imagePriority={index < 3} />
  ));

export default memo(PostNotGroupCards);
