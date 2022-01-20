const { Actions } = require("../models/actions");
const { Attempts } = require("../models/attempts");

async function getAction() {
  try {
    const action = await Actions.findOne({
      where: { id: 1 },
      attributes: ["id", "status"],
      raw: true,
      nest: true,
    });
    const validateAttempts = await Attempts.findOne({
      where: { id: 1 },
      raw: true,
      nest: true,
    });
    return Object.assign({}, action, validateAttempts);
  } catch (error) {
    throw new Error(error);
  }
}

async function setAction() {
  try {
    const action = await Actions.findOne({
      where: { id: 1 },
      raw: true,
      nest: true,
    });
    await Actions.update({ status: !action.status }, { where: { id: 1 } });
    return !action.status;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getAction,
  setAction,
};
