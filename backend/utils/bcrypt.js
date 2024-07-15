const bcrypt = require("bcryptjs");

const hashPassword = (password) => bcrypt.hashSync(password);

const comparePassword = (password, hashPwd) =>
  bcrypt.compareSync(password, hashPwd);

module.exports = { hashPassword, comparePassword };
