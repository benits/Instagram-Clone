const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async store(req, res) {
    try {
      const { name, userName, email, password } = req.body;
      const { filename: avatar } = req.file;
      const hashPass = "";

      User.find({ email })
        .exec()
        .then(user => {
          if (user.length >= 1) {
            return res.status(409).json({
              message: "Mail exists"
            });
          } else {
            bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  error: err
                });
              }
              hashPass = hash;
            });
          }
        });

      User.find({ userName })
        .exec()
        .then(user => {
          if (user.length >= 1) {
            return res.status(409).json({
              message: "User name exists"
            });
          }
        });

      const user = await User.create({
        name,
        userName,
        email,
        password: hashPass,
        avatar
      });

      res.status(201).json({
        message: "User created",
        user
      });
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  },
  async login(req, res) {
    try {
      const { userName, password } = req.body;

      return res.json(200);
    } catch (err) {
      return res.json({
        erro: `${err}`
      });
    }
  }
};
