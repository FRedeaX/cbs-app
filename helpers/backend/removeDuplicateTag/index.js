const removeDuplicateTag = async (data) => {
  const arrTags = [];
  const result = [];
  if (data && data.length === 0) return { arrTags, result };

  data.forEach((post) => {
    const tags = post.tags.nodes[0];

    if (tags !== undefined) {
      const tag = arrTags.find((tagID) => tagID === tags.tagId);
      if (tag !== undefined) return;

      arrTags.push(tags.tagId);
      result.push({ tags });
    } else {
      result.push(post);
    }
  });
  return { arrTags, result };
};

export default removeDuplicateTag;
