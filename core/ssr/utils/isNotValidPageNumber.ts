/**
 * Проверяем, что номер страницы не выходит за нижнюю или верхнюю границу.
 *
 * @param maxPageNumber default Infinity
 */
export const isNotValidPageNumber = (
  pageNumber: number,
  maxPageNumber = Infinity,
) => pageNumber < 1 || pageNumber >= maxPageNumber;
