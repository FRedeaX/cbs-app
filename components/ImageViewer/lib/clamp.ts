/**
 * Ограничивает результат нижней и верхней границей.
 */
export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));
