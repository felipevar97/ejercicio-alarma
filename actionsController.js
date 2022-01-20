const express = require("express");
const { setAction } = require("../services/actions");

var router = express.Router();

router.put("/action", async (_req, res) => {
  const resultAction = await setAction();
  const message = resultAction ? "Desactivar Alarma" : "Activar Alarma";
  res.send({ status: 200, message });
});

module.exports = router;
