/**
 * Retrieves an environment variable by key, converting it to uppercase.
 * @param key - The environment variable name (case-insensitive)
 * @returns The value of the environment variable, or undefined if not found
 */
export declare const getEnv: (key: keyof NodeJS.ProcessEnv) => string | undefined;
