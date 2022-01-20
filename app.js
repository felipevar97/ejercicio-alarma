const express = require("express");
const cors = require("cors");
const logger = require("morgan");
// Controllers
const renderController = require("./controllers/renderController");
const actionsController = require("./controllers/actionsController");
const usersController = require("./controllers/usersController");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(renderController);
app.use(actionsController);
app.use(usersController);

module.exports = app;
