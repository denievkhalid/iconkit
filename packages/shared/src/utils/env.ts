import dotenv from "dotenv";

dotenv.configDotenv();

type UpperKeys<T extends readonly string[]> = {
  [K in T[number] as Uppercase<K>]: string;
};

/**
 * Retrieves an environment variable by key, converting it to uppercase.
 *
 * @param key - The environment variable name (case-insensitive)
 * @returns The value of the environment variable, or undefined if not found
 */
export const getEnv = (key: keyof NodeJS.ProcessEnv): string =>
  process.env[key.toString().toUpperCase()] as string;

export const getEnvs = <T extends readonly string[]>(
  keys: T & readonly (keyof NodeJS.ProcessEnv)[],
): UpperKeys<T> =>
  Object.fromEntries(
    keys.map((key) => [key.toUpperCase(), getEnv(key)]),
  ) as UpperKeys<T>;
