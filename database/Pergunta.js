const Sequelize = require("sequelize");
const database = require("./database");

//Criando tabela e colunas
const Pergunta = database.connection.define("pergunta", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Pergunta.sync({ force: false }).then(() => {
  console.log("Table created");
});

module.exports = Pergunta;
