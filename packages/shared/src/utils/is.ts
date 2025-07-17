/**
 * Checks if the value is an array.
 *
 * @param value - Value to check.
 * @returns True if it's an array.
 */
export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

/**
 * Checks if the value is a plain object (i.e., not null, not an array, and created by `{}` or `new Object()`).
 *
 * @param value - Value to check.
 * @returns True if it's a plain object.
 */
export const isPlainObject = (
  value: unknown,
): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Checks if the value is a callable function.
 *
 * @param value - Value to check.
 * @returns True if it's a function.
 */
export const isFunction = (value: unknown): value is Function =>
  typeof value === "function";

/**
 * Checks if the value is empty.
 * Currently supports arrays only.
 *
 * @param value - Value to check.
 * @returns True if the value is an empty array.
 */
export const isEmpty = (value: unknown): value is boolean => {
  if (value == null) {
    return true;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  if (isArray(value)) {
    return value.length === 0;
  }

  return false;
};
