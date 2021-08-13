export const removeDuplicateTag = async (data) => {
  const arrTags = [];
  const result = [];
  if (!data) return { arrTags, result }

  data.forEach((post) => {
    const tags = post.tags.nodes[0];

    if (!!tags) {
      const tag = arrTags.find((tagID) => tagID === (tags.id || tags.tagId));
      if (tag) return;
      arrTags.push(tags.id || tags.tagId);
      result.push(post);
    } else {
      result.push(post);
    }
  });
  return { arrTags, result };
};
