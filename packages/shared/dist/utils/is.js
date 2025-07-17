"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.isArray = void 0;
/**
 * Checks whether the provided value is an array.
 *
 * This is a type guard that ensures the value is an array,
 * which helps TypeScript narrow the type accordingly.
 *
 * @param value - The value to check.
 * @returns True if the value is an array, false otherwise.
 */
const isArray = (value) => Array.isArray(value);
exports.isArray = isArray;
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
const isFunction = (value) => typeof value === "function";
exports.isFunction = isFunction;
