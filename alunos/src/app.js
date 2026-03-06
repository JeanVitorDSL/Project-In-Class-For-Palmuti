const express = require("express");
const AlunoService = require("./AlunoService");

function createApp() {
  const app = express();
  app.use(express.json());

  const service = new AlunoService();

  // POST /alunos → cadastrar aluno
  app.post("/alunos", (req, res) => {
    const { nome, idade, email, nota } = req.body;

    try {
      const aluno = service.cadastrarAluno(nome, Number(idade), email, Number(nota));
      return res.status(201).json(aluno);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  });

  // GET /alunos → listar todos
  app.get("/alunos", (req, res) => {
    return res.status(200).json(service.listar());
  });

  return app;
}

module.exports = createApp;
