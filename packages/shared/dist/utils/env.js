"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.configDotenv();
/**
 * Retrieves an environment variable by key, converting it to uppercase.
 * @param key - The environment variable name (case-insensitive)
 * @returns The value of the environment variable, or undefined if not found
 */
const getEnv = (key) => process.env[key];
exports.getEnv = getEnv;
