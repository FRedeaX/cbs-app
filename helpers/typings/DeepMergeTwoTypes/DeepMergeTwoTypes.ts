/**
 * Принимает 2 объекта T и U и создаёт новый объект, с их уникальными
 * ключами. Используется в `DeepMergeTwoTypes`
 */
type GetObjDifferentKeys<T, U> = Omit<T, keyof U> & Omit<U, keyof T>;
/**
 * Принимает 2 объекта T and U и создаёт новый объект с их ключами
 * Используется в `DeepMergeTwoTypes`
 */
type GetObjSameKeys<T, U> = Omit<T | U, keyof GetObjDifferentKeys<T, U>>;
type MergeTwoObjects<T, U> = GetObjDifferentKeys<T, U> & {
  // общие ключи рекурсивно заполняются за счёт `DeepMergeTwoTypes<...>`
  // eslint-disable-next-line no-use-before-define
  [K in keyof GetObjSameKeys<T, U>]: DeepMergeTwoTypes<T[K], U[K]>;
};

/**
 * Возвращает новый тип в котором T и U рекурсивно объединены.
 */
export type DeepMergeTwoTypes<T, U> =
  // проверяет являются ли типы массивами, распаковывает их и
  // запускает рекурсию
  [T, U] extends [(infer TItem)[], (infer UItem)[]]
    ? DeepMergeTwoTypes<TItem, UItem>[]
    : // если типы это объекты
    [T, U] extends [{ [key: string]: unknown }, { [key: string]: unknown }]
    ? MergeTwoObjects<T, U>
    : [T, U] extends [
        { [key: string]: unknown } | undefined,
        { [key: string]: unknown } | undefined,
      ]
    ? MergeTwoObjects<NonNullable<T>, NonNullable<U>> | undefined
    : T | U;
