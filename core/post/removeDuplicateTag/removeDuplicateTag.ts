type Node = {
  tags: {
    nodes: {
      tagId: number;
    }[];
  };
};

export const removeDuplicateTag = <T>(nodes: (T & Node)[]) => {
  const data: T[] = [];
  const tags: number[] = [];

  if (nodes.length > 0) {
    nodes.forEach((post) => {
      const tagsInPost = post.tags.nodes[0];

      if (tagsInPost !== undefined) {
        const tag = tags.find((tagID) => tagID === tagsInPost.tagId);
        if (tag !== undefined) return;

        tags.push(tagsInPost.tagId);
        data.push(post);
      } else {
        data.push(post);
      }
    });
  }

  return { tags, data };
};
