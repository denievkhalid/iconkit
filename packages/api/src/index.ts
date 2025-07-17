import cors from "cors";
import express from "express";
import multer from "@multer";
import { getEnv } from "@shared";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

multer.array("icons");

app.listen(getEnv("port"));
