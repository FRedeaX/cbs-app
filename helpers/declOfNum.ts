/**
 * Склонение числительных окончаний
 *
 * @param titles
 * 1. Для одного - именительный падеж (кто/что)
 * 2. От 2х до 4х - родительный падеж (кого/чего)
 * 3. От 5 до 9 и 0 - множественное число
 */
export const declOfNum = (titles: [string, string, string]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return (number: number) => {
    const n = Math.abs(number);
    const c = n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5];
    return titles[c];
  };
};
