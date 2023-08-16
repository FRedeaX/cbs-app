export type RangeDate = {
  /**
   * Больше.
   */
  gt?: string;
  /**
   * Больше или равно.
   */
  gte?: string;
  /**
   * Меньше.
   */
  lt?: string;
  /**
   * Меньше или равно.
   */
  lte?: string;
};

export const rangeDate = ({ gt, gte, lt, lte }: RangeDate) => ({
  range: {
    date: {
      ...(gt && { gt }),
      ...(gte && { gte }),
      ...(lt && { lt }),
      ...(lte && { lte }),
    },
  },
});
