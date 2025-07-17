/**
 * Checks whether the provided value is an array.
 *
 * This is a type guard that ensures the value is an array,
 * which helps TypeScript narrow the type accordingly.
 *
 * @param value - The value to check.
 * @returns True if the value is an array, false otherwise.
 */
export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

/**
 * Checks whether the provided value is a function.
 *
 * Useful when working with dynamic or unknown input,
 * such as optional callbacks or third-party configurations.
 * This is a type guard that allows safe function invocation.
 *
 * @param value - The value to check.
 * @returns True if the value is a function, false otherwise.
 */
export const isFunction = (value: unknown): value is Function =>
  typeof value === "function";
