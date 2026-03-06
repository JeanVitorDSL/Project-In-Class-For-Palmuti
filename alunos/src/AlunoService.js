const Aluno = require("./Aluno");

class AlunoService {
  constructor() {
    this.listaAlunos = [];
  }

  validarNome(nome) {
    if (!nome || nome.trim().length < 3) {
      throw new Error("Nome inválido");
    }
  }

  validarIdade(idade) {
    if (isNaN(idade) || idade < 16 || idade > 100) {
      throw new Error("Idade inválida");
    }
  }

  validarEmail(email) {
    if (!email || !email.includes("@") || !email.includes(".")) {
      throw new Error("Email inválido");
    }
  }

  validarNota(nota) {
    if (isNaN(nota) || nota < 0 || nota > 10) {
      throw new Error("Nota inválida");
    }
  }

  verificarEmailDuplicado(email) {
    const existe = this.listaAlunos.find((a) => a.email === email);
    if (existe) {
      throw new Error("Email já cadastrado");
    }
  }

  calcularStatus(nota) {
    return nota >= 7 ? "Aprovado" : "Reprovado";
  }

  cadastrarAluno(nome, idade, email, nota) {
    this.validarNome(nome);
    this.validarIdade(idade);
    this.validarEmail(email);
    this.validarNota(nota);
    this.verificarEmailDuplicado(email);

    const status = this.calcularStatus(nota);
    const aluno = new Aluno(nome, idade, email, nota, status);
    this.listaAlunos.push(aluno);
    return aluno;
  }

  listar() {
    return this.listaAlunos;
  }
}

module.exports = AlunoService;
