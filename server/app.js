#!/usr/bin/env node
var express = require("express");
var http = require("http");
var fs = require("fs");
const cors = require("cors");
const corsOptions = {
  origin: "*",
};
//serve files from 2nd argument or current working directory of the
var pathOfFolderToServe = `../dist/crop`;
var storagePath = "./storage/images/";
var app = express();
app.use(express.static(pathOfFolderToServe));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
http.createServer(app).listen(4200);

app.post("/uploadimage", cors(corsOptions), (req, res) => {
  console.log("INPATH", req.body.key);
  saveImage(req);
  res.json({ message: "File uploaded", status: 200 });
});

function saveImage(req) {
  let base64 = "";
  base64 = req.body.file.split(",")[1];
  var imageName = req.body.key;
  if (req.body.imageAction == "userImage") {
    imgPath = "/user_images/" + imageName + "_user_image.jpeg";
  } else if (req.body.imageAction == "singatureImage") {
    imgPath = "/signature_images/" + imageName + "_signature_image.jpeg";
  }
  let fullImagePath = storagePath + imgPath;
  fs.writeFile(fullImagePath, base64, "base64", function (err) {
    console.log(err);
  });
}
