import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Ensure upload directory exists
const uploadDir = 'uploads/';
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter
});

// ✅ Helper function to return file info
export const saveUploadedImage = (file) => {
  if (!file) return null;
  return {
    path: file.path,
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size
  };
};

// ✅ Export everything you need
export default upload;
export const single = (fieldName) => upload.single(fieldName);
