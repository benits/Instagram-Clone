const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async indexedDB(req, res) {
    try {
      const posts = await Post.find().sort("-createdAt");

      return res.status(200).json(posts);
    } catch (err) {
      return res.json({
        erro: `${err}`
      });
    }
  },

  async store(req, res) {
    try {
      const { author, place, description, hashtags } = req.body;
      const { filename: image } = req.file;

      await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, "resized", image));

      fs.unlinkSync(req.file.path);

      const post = await Post.create({
        author,
        place,
        description,
        hashtags,
        image
      });

      req.io.emit("post", post);

      return res.json(200, post);
    } catch (err) {
      return res.json({
        erro: `${err}`
      });
    }
  },

  async delete(req, res) {
    try {
      const post = await Post.deleteOne({ _id: req.params.id }, function(
        err,
        _
      ) {
        if (err) {
          return res.json({
            erro: `${err}`
          });
        }
        if (_.n === 0) {
          return res.json({
            erro: "Id Not Found"
          });
        }

        return res.json({
          status: 200,
          message: "Deleted Success"
        });
      });
    } catch (err) {
      return res.json({
        erro: `${err}`
      });
    }
  }
};
