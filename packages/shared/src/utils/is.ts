/**
 * Checks if the value is an array.
 *
 * @param value - Value to check.
 * @returns True if it's an array.
 */
export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

/**
 * Checks if the value is a callable function.
 *
 * @param value - Value to check.
 * @returns True if it's a function.
 */
export const isFunction = (value: unknown): value is Function =>
  typeof value === "function";
