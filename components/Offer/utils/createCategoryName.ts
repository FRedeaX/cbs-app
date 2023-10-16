export const createCategoryName = (categories: string[]) => {
  const { length } = categories;
  const category = [...categories];

  // Добавляем перенос строки по середине, если
  // количество категорий больше одного
  if (length > 1) {
    const index = Math.floor(length / 2);
    category[index] = `\n${category[index]}`;
  }

  const label = category.join(", ");
  const title = `Статьи по категори${
    length === 1 ? "и" : "ям"
  } ${categories.join(", ")}`;

  return { label, title };
};
