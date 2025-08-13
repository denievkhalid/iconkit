/**
 * Iterates over an array and executes a synchronous callback for each element.
 *
 * Executes the callback in the order of elements in the array (sequentially).
 * Does not support asynchronous callbacks — use an async variant if you need to await operations.
 *
 * @template T - Type of array elements.
 * @param arr - The array to iterate over.
 * @param callback - A synchronous function to execute for each element.
 */
export const forOf = <T>(arr: Array<T>, callback: (item: T) => void): void => {
  for (const item of arr) {
    callback(item);
  }
};
