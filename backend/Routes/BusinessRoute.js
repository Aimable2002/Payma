import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { businessController, getBusiness, getProduct, getuserPro, uploadPhoto } from '../controller/BusinessController.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const uploadToCloudinary = (buffer, folderName) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: folderName },
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
router.post('/upload',  protectRoute, upload.single('file'), uploadPhoto)

router.get('/get', protectRoute, getBusiness)

router.get('/get_product', protectRoute, getProduct)

router.get('/viewPro/:id', getuserPro)


export default router