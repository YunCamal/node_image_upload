const express = require('express');
const multer = require('multer');

const {v4: uuid} = require("uuid");
const mime = require("mime-types");

const app = express();
const PORT = 5000;
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => 
        cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
  }) ;

const upload = multer({
     storage, 
     fileFilter: (req, file, cb) => {
        if(["image/png", "image/jpeg"].includes(file.mimetype)) cb(null, true);
        else cb( new Error("invalid file type."), false);
    },
    limits:{
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});

app.use("/uploads", express.static("uploads")); // 클라이언트에서 접속이 된다.
app.post("/upload", upload.single("image"), (req,res) => { res.json(req.file);});
app.listen(PORT,() => console.log("Express server listening on PORT " + PORT));

