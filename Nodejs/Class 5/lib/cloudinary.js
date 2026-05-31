import { v2 as cloudinary } from 'cloudinary'
import configs from '../configs/configs.js';

cloudinary.config({
  cloud_name: configs.CLOUDINARY_NAME,
  api_key: configs.CLODUINARY_API_KEY,
  api_secret: configs.CLOUDINARY_API_SECRET,
});

export default cloudinary;