import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';
import { Paths } from '@/config';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.cwd(), Paths.UPLOAD));
  },
  filename: (req, file, cb) => {
    cb(null, `${nanoid(10)}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/svg+xml') {
      cb(null, true);
    } else {
      cb(new Error('Недопустимый тип файла. Разрешены только JPEG, PNG и PDF.'));
    }
  },
});
