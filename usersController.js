const express = require("express");
const { getUsers, crateUser, sendActionAlarm } = require("../services/users");

var router = express.Router();

router.get("/user", async (_req, res) => {
  const listUsers = await getUsers();
  res.send({ status: 200, message: listUsers });
});

router.post("/user", async (_req, res) => {
  const user = _req.body;
  try {
    const resultUser = await crateUser(user);
    res.send({ status: 200, message: resultUser });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.parent.sqlMessage ? "Nombre de usuario ya existe" : error,
    });
  }
});

router.post("/user/alarm", async (_req, res) => {
  const credentials = _req.body;
  try {
    const resultUser = await sendActionAlarm(credentials);
    res.status(200).send(resultUser);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error,
    });
  }
});

module.exports = router;
