const express = require("express");
const { getAction } = require("../services/actions");

var router = express.Router();

router.get("/", async (_req, res) => {
  const action = await getAction();
  res.render("pages/index", { data: action });
});

module.exports = router;
