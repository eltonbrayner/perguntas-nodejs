const Sequelize = require("sequelize");
const database = require("./database");

//Criando tabela e colunas
const Resposta = database.connection.define("resposta", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Resposta.sync({ force: false }).then(() => {
  console.log("Table response created");
});

module.exports = Resposta;
