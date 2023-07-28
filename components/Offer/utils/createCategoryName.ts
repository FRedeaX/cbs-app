export const createCategoryName = (categories: string[]) => {
  // Добавляем перенос строки по середине.
  const index = Math.floor(categories.length / 2);
  const category = [...categories];
  category[index] = `\n${category[index]}`;

  const label = category.join(", ");
  const title = `Статьи по категори${
    categories.length === 1 ? "и" : "ям"
  } ${categories.join(", ")}`;

  return { label, title };
};
