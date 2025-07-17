// src/index.ts
import cors from "cors";
import express from "express";

// ../shared/src/utils/env.ts
import { configDotenv } from "dotenv";
configDotenv();
var getEnv = (key) => process.env[key];

// src/index.ts
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(getEnv("port"));
