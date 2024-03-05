import multer from "multer";

//storage configurations
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

// middleware to handle student resumes that they upload while applying for a job
export const uploadFile = multer({
  storage: storageConfig,
});
