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
  [key: string]: unknown;
}

interface Result {
  categories: { nodes: Node[] };
  departments: { nodes: Node[] };
}

export const splitDepartmentAndCategories = (nodes: Node[]) => {
  const initState: Result = {
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
