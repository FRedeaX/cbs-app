type CallbackFn<T> = (element: T) => Promise<T>;

/**
 * Объединяем все `callbackFn` в плоский массив и запускаем параллельно.
 *
 * @param array Массив.
 * @param callbackFn Асинхронная функция, выполняемая для каждого элемента в массиве.
 *
 * @example
 * await flatPromise(
 *   array,
 *   async (element) => {
 *     const { child } = element;
 *     if (child) {
 *       return flatPromise(child, callbackFn).then((childElement) => ({
 *         ...d,
 *         child: childElement,
 *       }));
 *     }
 *     return addsFeaturesToPost(d);
 *   },
 * );
 */
export const flatPromise = async <T>(
  array: T[],
  callbackFn: CallbackFn<T>,
): Promise<T[]> => {
  const data: T[] = [];
  const promise: unknown[] = [];

  array.forEach((element, index) => {
    promise.push(
      callbackFn(element).then((childElement) => {
        data[index] = childElement;
      }),
    );
  });

  await Promise.all(promise);
  return data;
};
