const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.join(__dirname, "../../upload"));
    },
    filename: (request, file, callback) => {
      callback(null, new Date().toISOString() + file.originalname);
    },
  }),
  fileFilter: function (request, file, callback) {
    const filetypes = /jpg|jpeg|png/; //regex
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    ); //jpeg
    const mimetype = filetypes.test(file.mimetype); //image

    //console.log("1", path.extname(file.originalname).toLowerCase());
    //console.log("2", file.mimetype);

    if (mimetype && extname) {
      return callback(null, true);
    } else {
      return callback("Only images are allowed!", false);
    }
  },
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

module.exports = upload;
