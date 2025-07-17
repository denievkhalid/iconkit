import cors from "cors";
import express from "express";
import { getEnv } from "@shared";
import { uploadRouter } from "./router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", uploadRouter);

app.listen(getEnv("port"));
