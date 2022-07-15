export const offsetSides = (
  rootWidth: number,
  nodeSum: number,
  itemMargin: number,
): number => (rootWidth - nodeSum) / 2 - itemMargin;
