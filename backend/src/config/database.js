const mongoose = require("mongoose");

module.exports = () => {mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-fszop.mongodb.net/test?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);}
