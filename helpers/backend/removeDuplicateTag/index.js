export const removeDuplicateTag = async (data) => {
  const arrTags = [];
  const result = [];
  if (!data) return { arrTags, result };

  data.forEach((post) => {
    const tags = post.tags.nodes[0];

    if (tags !== undefined) {
      const tag = arrTags.find((tagID) => tagID === tags.id);
      if (tag !== undefined) return;

      arrTags.push(tags.id);
      result.push({ tags });
    } else {
      result.push(post);
    }
  });
  return { arrTags, result };
};
