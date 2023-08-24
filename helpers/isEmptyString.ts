/**
 * Проверяет наличие текста в двойных кавычках.
 * @example
 * - isEmptyString('""') - true
 * - isEmptyString('"text"') - false
 */
export const isEmptyString = (value: string) => /^(""|''|``)$/.test(value);
