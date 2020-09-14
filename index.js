const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const env = require("./.env");

// - - Banco de Dados START
//Banco de Dados
const database = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Conexão com o DB através do sequelize
database.connection
  .authenticate()
  .then(() => {
    console.log("Database connection made successfully.");
  })
  .catch((e) => {
    console.log(e);
  });
// - - Banco de Dados END

//Setando View Engine (Renderizador de HTML)
app.set("view engine", "ejs");

//Usando arquivos staticos como CSS/JS do Frontend
app.use(express.static("public"));

//Configurando BodyParser para receber informações do formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then(
    (arrayPerguntas) => {
      res.render("index", {
        perguntas: arrayPerguntas,
      });
    }
  );
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    console.log("Insert data with success");
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  const id = req.params.id;
  Pergunta.findOne({
    where: {
      id: id,
    },
    raw: true,
  }).then((el) => {
    if (el != undefined || el != null) {
      return Resposta.findAll({
        where: { perguntaId: el.id },
        order: [["id", "DESC"]],
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: el,
          respostas: respostas,
        });
      });
    }
    return res.redirect("/");
  });
});

app.post("/responder", (req, res) => {
  const corpo = req.body.corpo;
  const perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`);
  });
});

app.listen(env.PORT, () => {
  return console.log("Server runing on port " + env.PORT);
});
