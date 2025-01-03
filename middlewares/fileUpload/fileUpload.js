const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") + Date.now();
    cb(null, fileName + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  fileFilter(req, file, cb) {
    // Allowed field names
    const allowedFields = [
      "avatar",
      "image",
      "profile-photo",
      "cover-photo",
      "file",
      "video",
      "audio",
    ];
    const isAllowedField = allowedFields.includes(
      file.fieldname?.toLowerCase()
    );

    // Allowed formats
    const isAllowedFormat = file.originalname.match(
      /\.(jpg|png|jpeg|gif|mp4|mp3|pdf|doc|docx|xls|xlsx)$/i
    );

    // Validate field and format
    if (!isAllowedField) {
      return cb(new Error(`Invalid field: ${file.fieldname}`));
    }
    if (!isAllowedFormat) {
      return cb(
        new Error(
          "Invalid file format. Allowed formats: jpg, png, jpeg, gif, mp4, mp3, doc, docx, xls, xlsx, pdf."
        )
      );
    }

    cb(null, true);
  },
});

const fileUpload = (req, res, next) => {
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "image", maxCount: 5 },
    { name: "profile-photo", maxCount: 1 },
    { name: "cover-photo", maxCount: 1 },
    { name: "file", maxCount: 5 },
    { name: "video", maxCount: 5 },
    { name: "audio", maxCount: 5 },
  ])(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      return res.status(400).json({
        status: 400,
        message: `Multer error: ${err.message}`,
      });
    } else if (err) {
      // Handle other errors
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
    next();
  });
};

module.exports = fileUpload;
