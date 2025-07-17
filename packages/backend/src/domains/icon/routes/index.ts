import express from 'express';
import { upload } from '@/lib';
import { iconUpload } from '../controllers';

export const iconRouter = express.Router();

iconRouter.post('/upload', upload.array('icons'), iconUpload);
