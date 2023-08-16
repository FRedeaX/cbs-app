const departments = [
  "ЦБС",
  "ЦГБ",
  "ЦГДБ",
  "Филиал №1",
  "Филиал №5",
  "ООЕФКиТЛ",
  "ЦпоПДиЮ",
  "ИБО",
];

interface Node {
  name: string;
}

interface Result<T> {
  categories: { nodes: (T & Node)[] };
  departments: { nodes: (T & Node)[] };
}

export const splitDepartmentAndCategories = <T>(nodes: (T & Node)[]) => {
  const initState: Result<T> = {
    categories: { nodes: [] },
    departments: { nodes: [] },
  };

  return nodes.reduce((acc, category) => {
    if (departments.includes(category.name))
      acc.departments.nodes.push(category);
    else acc.categories.nodes.push(category);

    return acc;
  }, initState);
};
