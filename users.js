const { User } = require("../models/users");
const { Attempts } = require("../models/attempts");

async function getUsers() {
  try {
    const listUsers = await User.findAll();
    return listUsers;
  } catch (error) {
    throw new Error(error);
  }
}

async function crateUser(user) {
  try {
    const userCreated = await User.create(user);
    return userCreated;
  } catch (error) {
    throw new Error(error);
  }
}

async function sendActionAlarm(credentials) {
  try {
    const matchUser = await User.findOne({
      where: { user: credentials.username, pass: credentials.password },
      raw: true,
      nest: true,
    });
    const validateAttempts = await Attempts.findOne({
      where: { id: 1 },
      raw: true,
      nest: true,
    });
    const seconds = new Date(validateAttempts.updatedAt);
    const actualDate = new Date();
    actualDate.setHours(
      actualDate.getHours() - seconds.getHours(),
      actualDate.getMinutes() - seconds.getMinutes(),
      actualDate.getSeconds() - seconds.getSeconds()
    );
    const count =
      actualDate.getHours() * 3600 +
      actualDate.getMinutes() * 60 +
      actualDate.getSeconds();
    if (matchUser !== null && validateAttempts.unsuccessful < 3) {
      await Attempts.update({ unsuccessful: 0 }, { where: { id: 1 } });
      return {
        status: 200,
        message: "alarma desactivada Correctamente",
      };
    } else {
      if (validateAttempts.unsuccessful < 3) {
        await Attempts.update(
          { unsuccessful: validateAttempts.unsuccessful + 1 },
          { where: { id: 1 } }
        );
        return {
          status: 404,
          message: `Credenciales incorrectas te quedan ${
            2 - validateAttempts.unsuccessful
          } intentos`,
        };
      } else {
        if (count >= 30)
          await Attempts.update({ unsuccessful: 0 }, { where: { id: 1 } });
        return {
          status: 500,
          message:
            "Se han superado la cantidad de intentos, espera por favor 30 segundos",
        };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getUsers,
  crateUser,
  sendActionAlarm,
};
