const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const files = require("../Model/Upload");
const asyncHandler = require("express-async-handler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../frontend/public/uploads"));
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
}).array("uploadImages", 10);

router.post("/", (req, res) => {
  multi_upload(req, res, async function (err) {
    // console.log(req.files);
    //multer error
    if (err instanceof multer.MulterError) {
      console.log(err);
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
    const uploadedFiles = new files({
      files: req.files,
    });
    const createdfiles = await uploadedFiles.save();
    // console.log(createdfiles);
    res.status(200).send(createdfiles);
  });
});

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const file = await files.findById(req.params.id);
    if (file) {
      res.json(file);
    } else {
      res.status(404);
      throw new Error("file not found");
    }
  })
);

module.exports = router;
