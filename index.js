const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const env = require("./.env");

//Setando View Engine (Renderizador de HTML)
app.set("view engine", "ejs");

//Usando arquivos staticos como CSS/JS do Frontend
app.use(express.static("public"));

//Configurando BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  res.send(`Recebido o titulo: ${titulo} e a descrição ${descricao}`);
});

app.listen(env.PORT, () => {
  return console.log("Server runing on port " + env.PORT);
});
