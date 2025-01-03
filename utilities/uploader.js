// const multer = require("multer");
// const path = require("path");

// function uploader(
//   subfolder_path,
//   allowed_file_types,
//   max_file_size,
//   error_message
// ) {
//   const uploadFolder = `${__dirname}/../public/uploads/${subfolder_path}`;
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, uploadFolder);
//     },
//     filename: function (req, file, cb) {
//       const fileExt = path.extname(file.originalname);
//       const fileName =
//         file.originalname
//           .replace(fileExt, "")
//           .toLowerCase()
//           .split(" ")
//           .join("-") + Date.now();

//       cb(null, fileName + fileExt);
//     },
//   });

//   const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 5,
//     },
//     fileFilter(req, file, cb) {
//       const fileFields = [
//         "image",
//         "profile-photo",
//         "cover-photo",
//         "file",
//         "video",
//         "audio",
//       ];
//       const fileExist = fileFields.includes(
//         file.fieldname?.toLocaleLowerCase()
//       );
//       const desiredFormat = file.originalname.match(
//         /\.(jpg|png|jpeg|gif|mp4|mp3|pdf|doc|docx|xls|xlsx)$/i
//       );

//       if (!fileExist) {
//         return cb(new Error("Invalid file type"));
//       }
//       if (!desiredFormat) {
//         return cb(
//           new Error(
//             "Only jpg, png, jpeg, gif, mp4, mp3, doc, docx, xls, xlsx and pdf format are allowed"
//           )
//         );
//       }
//       cb(null, true);
//     },
//   });

//   const fileUpload = upload.fields([
//     { name: "image", maxCount: 5 },
//     { name: "profile-photo", maxCount: 1 },
//     { name: "cover-photo", maxCount: 1 },
//     { name: "file", maxCount: 5 },
//     { name: "video", maxCount: 5 },
//     { name: "audio", maxCount: 5 },
//   ]);
// }
