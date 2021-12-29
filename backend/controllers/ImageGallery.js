const ImageGallery = require("../Model/Gallery");
const asyncHandler = require("express-async-handler");
const path = require("path");
const multer = require("multer");

//get-all-Images
const getImages = asyncHandler(async (req, res) => {
  try {
    const Images = await ImageGallery.find();
    res.status(200).json(Images);
  } catch (error) {
    res.status(404).json({ message: "Image not found!" });
  }
});

//create-images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../frontend/public/ImageGallery"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});

const multi_upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .jpg .jpeg .png images are supported!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).single("ImageGallery");

const createImage = asyncHandler(async (req, res) => {
  
  multi_upload(req, res, async function (err) {
    // console.log(req.file);
    //multer error
    if (err instanceof multer.MulterError) {
      res
        .status(500)
        .send({
          error: { msg: `multer uploading error: ${err.message}` },
        })
        .end();
      return;
    } else if (err) {
      //unknown error
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { msg: `${err.message}` } })
          .end();
      } else {
        res
          .status(500)
          .send({ error: { msg: `unknown uploading error: ${err.message}` } })
          .end();
      }
      return;
    }
    const uploadedFiles = new ImageGallery({
      filename: req.file.filename,
    });
    const createdfiles = await uploadedFiles.save();
    console.log(`file`,createdfiles);
    res.status(200).send(createdfiles);
  });
});

//delete-one-image
const deleteImage = asyncHandler(async (req, res) => {
  try {
    await ImageGallery.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted successfully");
  } catch (error) {
    res.status(400).json("image not deleted");
  }
});
module.exports = { getImages, createImage, deleteImage };
