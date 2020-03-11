const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");
const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");
const UserController = require("./controllers/UserController");

const routes = new express.Router();
const upload = multer(uploadConfig);

//List all posts
routes.get("/posts", PostController.indexedDB);

//Create a new post
routes.post("/posts", upload.single("image"), PostController.store);

//Delete a post
routes.delete("/posts/:id", PostController.delete);

//Register Likes in the post
routes.post("/posts/:id/like", LikeController.store);

//Create a new User
routes.post("/user", UserController.store);

module.exports = routes;
