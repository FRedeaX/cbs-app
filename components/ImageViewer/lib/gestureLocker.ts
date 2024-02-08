/**
 * Блокировщик жестов.
 *
 * @param initialState Состояние блокировки. По-умолчанию: false
 */
export const gestureLocker = (initialState = false) => {
  let isLock = initialState;

  return {
    /**
     * Добавляет блокировку.
     */
    lock: () => {
      isLock = true;
    },
    /**
     * Убирает блокировку.
     */
    unlock: () => {
      isLock = false;
    },
    /**
     * @param value Значение.
     */
    set: (value: boolean) => {
      isLock = value;
    },
    /**
     * @returns Состояние блокировки.
     */
    get: () => isLock,
  };
};
