/**
 * Рассчитывает дополнительное смещение на основании импульса.
 *
 * @param startVelocity Импульс жеста
 */
export const projection = (startVelocity: number) =>
  (startVelocity * 0.998) / (1 - 0.998);
