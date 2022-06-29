const getShortID = (id: string) => {
  switch (id.length) {
    case 16:
      return id.slice(9, 13);
    default:
      return id;
  }
};

export default getShortID;
