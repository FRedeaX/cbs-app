const sortingCategories = async (categoryList) => {
  if (!categoryList) throw new Error("categoryList of null");
  return categoryList.sort((a, b) => a.name.length - b.name.length);
};

export default sortingCategories;
