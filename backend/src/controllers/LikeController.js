const Post = require("../models/Post");

module.exports = {
  async store(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (post === null) {
        return res.json({ message: "Id Not Found" });
      }

      post.likes += 1;

      await post.save();

      req.io.emit("like", post);

      return res.json(post);
    } catch (err) {
      return res.json({
        erro: `${err}`
      });
    }
  }
};
