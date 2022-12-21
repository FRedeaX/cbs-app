export const clampLoop = (min: number, value: number, max: number): number => {
  if (value < min) return max;
  if (value > max) return min;
  return value;
};
