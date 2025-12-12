import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/Cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "general_uploads";

    if (req.url.includes("property")) folder = "property_images";
    if (req.url.includes("profile")) folder = "profile_pictures";
    if (req.url.includes("message")) folder = "message_attachments";
    if (req.url.includes("dossier")) folder = "dossier_files";

    return {
      folder,
      resource_type: "auto" // allows pdf, images, etc.
    };
  }
});

const upload = multer({ storage });

export default upload;
