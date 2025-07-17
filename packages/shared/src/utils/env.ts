import dotenv from "dotenv";

dotenv.configDotenv();

/**
 * Retrieves an environment variable by key, converting it to uppercase.
 * @param key - The environment variable name (case-insensitive)
 * @returns The value of the environment variable, or undefined if not found
 */
export const getEnv = (key: keyof NodeJS.ProcessEnv) => process.env[key];
