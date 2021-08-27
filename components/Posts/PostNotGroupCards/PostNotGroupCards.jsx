import React, { memo } from "react";
import Card from "../Card/Card";

const PostNotGroupCards = ({ data }) =>
  data.map((post, index) => (
    <Card key={post.id} data={post} horizontal={true} index={index} />
  ));

export default memo(PostNotGroupCards);
