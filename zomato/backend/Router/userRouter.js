const express = require("express");
const multer = require("multer");
const { signup, login, uploadProfilePicture } = require("../Controller/userController");
const userAuth = require("../Middleware/userAuth");


const userRouter = express.Router();
const storageConfiguration = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images/users")
    },
    filename: function(req, file, cb) {
        cb(null, `user-${Date.now()}.jpg`)
    }
})


function multerFileFilter(req, file, cb) {
    if(file.mimetype.includes("image")) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({storage: storageConfiguration, fileFilter: multerFileFilter})

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/upload-profile-picture", userAuth, upload.single('image'), uploadProfilePicture)
module.exports = userRouter;
