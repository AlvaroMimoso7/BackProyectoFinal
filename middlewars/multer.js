const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    console.log("file",file);
    let extension = path.extname(file.originalname);

    if (extension !== ".png" && extension !== ".jpg" && extension !== ".jpeg") {
      return cb(new Error("Formato Incorrecto"), false);
    }

    cb(null, true);
  },
});

