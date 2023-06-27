/**
 * Возвращает тип без указанных свойств.
 *
 * @param T Исходный тип.
 * @param U Свойства которые необходимо удалить.
 */
export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

/**
 * Возвращает тип который может быть null.
 */
export type Nullable<T> = T | null;

/**
 * Возвращает тип который может быть undefined.
 */
export type Maybe<T> = T | undefined;

/**
 * Возвращает тип в котором переданные ключи являются обязательными.
 */
export type Defaultize<TSource, TKeys extends keyof TSource> = TSource & {
  [P in TKeys]-?: TSource[P];
};

/**
 * Возвращает тип функции которая ничего не возвращает.
 */
export type Void = () => void;

/**
 * Возвращает тип в котором есть типизированные `custom properties`
 */
export type { Properties as CSSProperties } from "csstype";

/**
 * Возвращает Т в котором все свойства могут быть null.
 */
export type NullableAll<T> = {
  [P in keyof T]: Nullable<T[P]>;
};
