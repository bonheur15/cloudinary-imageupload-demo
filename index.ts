// simple express server

import express from "express";
import { v2 as cloudinary } from "cloudinary";
import fileUpload, { type UploadedFile } from "express-fileupload";
cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const app = express();
const port = process.env.PORT || 3000;

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.post("/upload", async (req, res) => {
  const tempfile = req.files?.file as unknown as UploadedFile;
  console.log(req.files?.file);
  const uploadResult = await cloudinary.uploader
    .upload(tempfile.tempFilePath, {
      public_id: tempfile.name,
    })
    .catch((error) => {
      console.log(error);
    });
    res.json(uploadResult);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
