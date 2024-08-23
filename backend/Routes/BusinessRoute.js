import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { businessController, uploadPhoto } from '../controller/BusinessController.js';
import multer from 'multer';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const uploadToCloudinary = (buffer, folderName) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: folderName },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer);
    });
  };


router.post('/uploadProduct', protectRoute, businessController)
router.post('/upload', protectRoute, upload.single('file'), uploadPhoto)


export default router