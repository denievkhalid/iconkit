/**
 * Type guard: checks if value is an array.
 *
 * @param value - Value to check.
 * @returns True if it's an array.
 */
export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

/**
 * Type guard: checks if value is a function.
 *
 * @param value - Value to check.
 * @returns True if it's a function.
 */
export const isFunction = (value: unknown): value is Function =>
  typeof value === "function";
