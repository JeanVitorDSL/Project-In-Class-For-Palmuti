const request = require("supertest");
const createApp = require("../src/app");

// Cada bloco de testes usa sua própria instância do app
// para garantir isolamento de estado entre os testes
let app;

beforeEach(() => {
  app = createApp();
});

// ==========================================
// TESTES DE NOME
// ==========================================

describe("Validação de Nome", () => {

  test("Nome vazio deve retornar 400", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "",
      idade: 20,
      email: "teste@email.com",
      nota: 8,
    });
    expect(res.status).toBe(400);
    expect(res.body.erro).toBe("Nome inválido");
  });

  test("Nome menor que 3 caracteres deve retornar 400", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "aa",
      idade: 20,
      email: "teste@email.com",
      nota: 8,
    });
    expect(res.status).toBe(400);
    expect(res.body.erro).toBe("Nome inválido");
  });

  test("Nome válido deve retornar 201", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Joao",
      idade: 20,
      email: "teste@email.com",
      nota: 8,
    });
    expect(res.status).toBe(201);
    expect(res.body.nome).toBe("Joao");
  });

});

// ==========================================
// TESTES DE IDADE
// ==========================================

describe("Validação de Idade", () => {

  test("Idade menor que 16 deve retornar 400", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Joao",
      idade: 15,
      email: "teste@email.com",
      nota: 8,
    });
    expect(res.status).toBe(400);
    expect(res.body.erro).toBe("Idade inválida");
  });

  test("Idade maior que 100 deve retornar 400", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Joao",
      idade: 101,
      email: "teste@email.com",
      nota: 8,
    });
    expect(res.status).toBe(400);
    expect(res.body.erro).toBe("Idade inválida");
  });

  test("Idade válida deve retornar 201", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Maria",
      idade: 25,
      email: "teste@email.com",
      nota: 8,
    });
    expect(res.status).toBe(201);
    expect(res.body.idade).toBe(25);
  });

});

// ==========================================
// TESTES DE EMAIL
// ==========================================

describe("Validação de Email", () => {

  test("Email sem @ deve retornar 400", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Joao",
      idade: 20,
      email: "emailsemarroba.com",
      nota: 8,
    });
    expect(res.status).toBe(400);
    expect(res.body.erro).toBe("Email inválido");
  });

  test("Email sem ponto deve retornar 400", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Joao",
      idade: 20,
      email: "email@semdponto",
      nota: 8,
    });
    expect(res.status).toBe(400);
    expect(res.body.erro).toBe("Email inválido");
  });

  test("Email válido deve retornar 201", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Pedro",
      idade: 30,
      email: "pedro@email.com",
      nota: 7,
    });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe("pedro@email.com");
  });

});

// ==========================================
// TESTES DE NOTA
// ==========================================

describe("Validação de Nota", () => {

  test("Nota menor que 0 deve retornar 400", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Joao",
      idade: 20,
      email: "teste@email.com",
      nota: -1,
    });
    expect(res.status).toBe(400);
    expect(res.body.erro).toBe("Nota inválida");
  });

  test("Nota maior que 10 deve retornar 400", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Joao",
      idade: 20,
      email: "teste@email.com",
      nota: 11,
    });
    expect(res.status).toBe(400);
    expect(res.body.erro).toBe("Nota inválida");
  });

  test("Nota válida deve retornar 201", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Carlos",
      idade: 22,
      email: "teste@email.com",
      nota: 5,
    });
    expect(res.status).toBe(201);
    expect(res.body.nota).toBe(5);
  });

});

// ==========================================
// TESTES DE STATUS
// ==========================================

describe("Regra de Negócio - Status", () => {

  test("Nota 7 → Aprovado", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Joao",
      idade: 20,
      email: "teste@email.com",
      nota: 7,
    });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("Aprovado");
  });

  test("Nota 6.9 → Reprovado", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Joao",
      idade: 20,
      email: "teste@email.com",
      nota: 6.9,
    });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("Reprovado");
  });

  test("Nota 10 → Aprovado", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Ana",
      idade: 19,
      email: "teste@email.com",
      nota: 10,
    });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("Aprovado");
  });

  test("Nota 0 → Reprovado", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Lucas",
      idade: 21,
      email: "teste@email.com",
      nota: 0,
    });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("Reprovado");
  });

});

// ==========================================
// TESTE DE CADASTRO COMPLETO
// ==========================================

describe("Cadastro Completo", () => {

  test("Cadastro válido retorna aluno com status correto", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Joao Silva",
      idade: 20,
      email: "joao@email.com",
      nota: 8.5,
    });
    expect(res.status).toBe(201);
    expect(res.body.nome).toBe("Joao Silva");
    expect(res.body.idade).toBe(20);
    expect(res.body.email).toBe("joao@email.com");
    expect(res.body.nota).toBe(8.5);
    expect(res.body.status).toBe("Aprovado");
  });

  test("GET /alunos retorna lista com aluno cadastrado", async () => {
    await request(app).post("/alunos").send({
      nome: "Joao Silva",
      idade: 20,
      email: "joao@email.com",
      nota: 8.5,
    });

    const res = await request(app).get("/alunos");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].nome).toBe("Joao Silva");
  });

});

// ==========================================
// DESAFIO EXTRA - EMAIL DUPLICADO
// ==========================================

describe("Email Duplicado", () => {

  test("Email duplicado deve retornar 400", async () => {
    // Primeiro cadastro — deve ter sucesso
    await request(app).post("/alunos").send({
      nome: "Teste Um",
      idade: 20,
      email: "duplicado@email.com",
      nota: 8,
    });

    // Segundo cadastro com mesmo email — deve falhar
    const res = await request(app).post("/alunos").send({
      nome: "Teste Dois",
      idade: 22,
      email: "duplicado@email.com",
      nota: 9,
    });

    expect(res.status).toBe(400);
    expect(res.body.erro).toBe("Email já cadastrado");
  });

});
