/**
 * Ограничивает результат нижней и верхней границей.
 * - при достижении нижней границы вернет `max`
 * - при достижении верхней границы вернет `min`
 */
export const clampLoop = (min: number, value: number, max: number): number => {
  if (value < min) return max;
  if (value > max) return min;
  return value;
};
