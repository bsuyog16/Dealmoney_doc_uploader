#!/usr/bin/env node
var express = require("express");
var http = require("http");
var fs = require("fs");
const cors = require("cors");
//If not required, remove corsOptions if CORS error is not present
const corsOptions = {
  origin: "*",
};

//storagePath is the path where images are supposed to be stored.
//Update this variable with appropriate path.
var storagePath = "./storage/images/";
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
http.createServer(app).listen(4200);

//If not required, remove cors(corsOptions) if CORS error is not present
app.post("/uploadimage", cors(corsOptions), (req, res) => {
  saveImage(req);
  //Based on succeess & faliure. throw you can customize your response below
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
  //fullImagePath can be used to store image path in DB.
  let fullImagePath = storagePath + imgPath;
  fs.writeFile(fullImagePath, base64, "base64", function (err) {
    //Based on succeess & faliure. throw you can customize your response below
    //On success, use this part to store fullImagePath in DB
    console.log(err);
  });
}
