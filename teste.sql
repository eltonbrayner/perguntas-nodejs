//Criando DATABASE
CREATE DATABASE nodejs;

//Criando tabela
CREATE TABLE usuarios(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50),
  email VARCHAR(100),
  idade INT(2)
);

//Inserindo dados
INSERT INTO usuarios(
  nome,
  email,
  idade
)
VALUES(
  'Ewerton Tavares',
  'ewerton@gmail.com',
  27
);

//Deletando dados
DELETE FROM usuarios WHERE id = 2;

//Atualizando dados
UPDATE usuarios SET nome = "Elton Brayner Tavares Bezerra" where id = 1;