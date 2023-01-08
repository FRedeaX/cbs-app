export const getShortID = (id: string) => {
  if (!id) return undefined;

  switch (id.length) {
    case 16:
      return id.slice(9, 13);
    default:
      return id;
  }
};
