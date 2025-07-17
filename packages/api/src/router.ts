import express from "express";
import { generateRepoName } from "@github";
import multer from "@multer";
import { asyncHandler, getOptimizeSvg } from "@shared";

export const uploadRouter = express.Router();

uploadRouter.post(
  "/",
  multer.array("icons"),
  asyncHandler(async (req, res) => {
    const files = req.files as Express.Multer.File[];

    const repoName = generateRepoName();
    getOptimizeSvg("12");

    for (const file of files) {
    }
  }),
);
