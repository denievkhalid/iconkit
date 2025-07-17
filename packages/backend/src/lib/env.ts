import { configDotenv } from 'dotenv';

configDotenv();

export const getEnv = (field: string) => process.env[field.toUpperCase()] || '';
