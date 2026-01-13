import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'uploads/');
    },
    filename: (req, file,cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(
            new Error ("Invalid file type. Only JPEG, JPG and PNG are allowed."),
            false
        );
    }
        
};

 
// Initialize Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});
 
export default upload;
 