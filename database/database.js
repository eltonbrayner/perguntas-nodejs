//Criando conexão com o Sequelize
const Sequelize = require("sequelize");
const env = require("../.env");

const connection = new Sequelize("perguntas", "root", env.dbpass, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = {
  connection,
};
