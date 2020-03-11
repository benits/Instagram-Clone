const express = require("express");
const db = require("./config/database");
const path = require("path");
const cors = require("cors");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

db();

//Middleware passando a função IO para todas as rotas
app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

server.listen(3333, console.log("App is running at port: 3333"));
