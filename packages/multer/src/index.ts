import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";

/**
 * Multer storage configuration for saving uploaded files to the 'upload' directory.
 * Filenames are generated using a random nanoid and preserve the original file extension.
 */
const storage = multer.diskStorage({
  /**
   * Defines the destination folder for uploaded files.
   * @param {Express.Request} req - The Express request object.
   * @param {Express.Multer.File} file - The uploaded file object.
   * @param {Function} cb - Callback to specify the upload destination.
   */
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.cwd(), "upload"));
  },

  /**
   * Defines the filename format for uploaded files.
   * @param {Express.Request} req - The Express request object.
   * @param {Express.Multer.File} file - The uploaded file object.
   * @param {Function} cb - Callback to specify the filename.
   */
  filename: (req, file, cb) => {
    cb(null, `${nanoid(10)}${path.extname(file.originalname)}`);
  },
});

/**
 * Multer middleware configured for:
 * - SVG file uploads only
 * - Max file size of 5MB
 */
export default multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  /**
   * File filter to allow only SVG files.
   * @param {Express.Request} req - The Express request object.
   * @param {Express.Multer.File} file - The uploaded file object.
   * @param {Function} cb - Callback to accept or reject the file.
   */
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/svg+xml") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only SVG files are allowed."));
    }
  },
});
