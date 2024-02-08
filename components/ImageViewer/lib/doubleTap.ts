/**
 * @param delta Количество (ms) между нажатиями. По-умолчанию: 350
 * @param tapArea Расстояние в (px) между нажатиями. По-умолчанию: 50
 * @returns fn
 */
export const doubleTap = (delta = 350, tapArea = 50) => {
  let prev = 0;
  let prevXY = [0, 0];
  let isTap = false;

  /**
   * @param time Временная метка
   * @param xy Положение указателя
   * @returns boolean
   */
  return (time: number, xy: [number, number]) => {
    const newTime = time - prev;
    prev = time;

    const x = prevXY[0] - xy[0];
    const y = prevXY[1] - xy[1];
    const isArea = Math.abs(x) < tapArea && Math.abs(y) < tapArea;
    prevXY = xy;

    isTap = newTime < delta && isArea;
    if (isTap) {
      prev = 0;
      prevXY = [0, 0];
    }

    return isTap;
  };
};
