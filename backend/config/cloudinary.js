import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { CLOUDINARY_API_SECRET } from "../config/envar.js";
import multer from "multer";

// Image Storage Engine
cloudinary.config({
  cloud_name: "dflbdufsw",
  api_key: "429815358914998",
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food_images",
    format: async (req, file) => "png",
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});

const upload = multer({ storage });

export default upload;
