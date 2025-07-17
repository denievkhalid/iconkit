import asyncHandler from "express-async-handler";
import express from "express";
import multer from "@multer";

export const uploadRouter = express.Router();

uploadRouter.post(
  "/",
  multer.array("icons"),
  asyncHandler(async (req, res) => {
    const files = req.files as Express.Multer.File[];
  }),
);
