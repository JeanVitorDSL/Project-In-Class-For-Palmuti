# 🎓 Sistema de Cadastro de Alunos — Testes E2E com Node.js

![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Jest](https://img.shields.io/badge/Tested%20with-Jest%20%2B%20Supertest-red)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%2F%20JS%20Puro-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Sistema de cadastro de alunos desenvolvido com foco em **testes**, implementado em duas camadas independentes: frontend em HTML/JS puro e backend em Node.js com Express.

---

## 🧠 Sobre o Projeto

O objetivo principal não foi apenas criar um CRUD, mas explorar como escrever e organizar testes de forma consistente nas duas pontas da aplicação, sem depender de frameworks externos como Cypress ou Playwright.

**No frontend**, foi construído um mini framework de testes do zero — com funções próprias de `assert`, `esperarErro` e execução de suítes — rodando direto no navegador.

**No backend**, os testes cobrem as rotas da API com Jest e Supertest, fazendo requisições HTTP reais (`POST /alunos`, `GET /alunos`) e garantindo isolamento de estado entre cada caso de teste.

---

## 🗂️ Estrutura do Projeto

```
cadastro-alunos/
│
├── frontend/
│   └── index.html           # Interface + Service + Framework de testes
│
├── backend/
│   ├── src/
│   │   ├── Aluno.js         # Model
│   │   ├── AlunoService.js  # Regras de negócio e validações
│   │   └── app.js           # Rotas Express (factory function)
│   ├── tests/
│   │   └── alunos.test.js   # Testes E2E com Jest + Supertest
│   ├── server.js            # Entry point
│   └── package.json
│
└── README.md
```

---

## ⚙️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | HTML, CSS, JavaScript puro |
| Backend | Node.js, Express |
| Testes (backend) | Jest, Supertest |
| Testes (frontend) | Framework próprio (vanilla JS) |

---

## 🚀 Como Rodar

### Backend

```bash
# Entrar na pasta e instalar dependências
cd backend
npm install

# Rodar o servidor
node server.js

# Rodar os testes
npm test
```

A API ficará disponível em `http://localhost:3000`.

### Frontend

Abra o arquivo `frontend/index.html` diretamente no navegador. Não requer instalação.

Clique em **Rodar Testes** para executar a suíte de testes no navegador.

---

## 📡 Endpoints da API

### `POST /alunos`

Cadastra um novo aluno.

**Body (JSON):**
```json
{
  "nome": "João Silva",
  "idade": 20,
  "email": "joao@email.com",
  "nota": 8.5
}
```

**Resposta de sucesso (201):**
```json
{
  "nome": "João Silva",
  "idade": 20,
  "email": "joao@email.com",
  "nota": 8.5,
  "status": "Aprovado"
}
```

**Resposta de erro (400):**
```json
{
  "erro": "Nome inválido"
}
```

---

### `GET /alunos`

Retorna a lista de todos os alunos cadastrados.

**Resposta (200):**
```json
[
  {
    "nome": "João Silva",
    "idade": 20,
    "email": "joao@email.com",
    "nota": 8.5,
    "status": "Aprovado"
  }
]
```

---

## ✅ Regras de Negócio

| Campo | Regra |
|---|---|
| Nome | Mínimo 3 caracteres, não pode ser vazio |
| Idade | Entre 16 e 100 anos |
| Email | Deve conter `@` e `.` — não pode ser duplicado |
| Nota | Entre 0 e 10 |
| Status | `Aprovado` se nota ≥ 7, `Reprovado` caso contrário |

---

## 🧪 Cobertura de Testes

### Backend — Jest + Supertest (19 testes)

| Suíte | Casos |
|---|---|
| Validação de Nome | Nome vazio, nome curto, nome válido |
| Validação de Idade | Menor que 16, maior que 100, idade válida |
| Validação de Email | Sem @, sem ponto, email válido |
| Validação de Nota | Menor que 0, maior que 10, nota válida |
| Regra de Negócio - Status | Nota 7, 6.9, 10 e 0 |
| Cadastro Completo | Retorno completo do objeto + GET após POST |
| Email Duplicado | Segundo cadastro com mesmo email |

```bash
npm test

 PASS  tests/alunos.test.js
  Validação de Nome
    ✓ Nome vazio deve retornar 400
    ✓ Nome menor que 3 caracteres deve retornar 400
    ✓ Nome válido deve retornar 201
  Validação de Idade
    ✓ Idade menor que 16 deve retornar 400
    ✓ Idade maior que 100 deve retornar 400
    ✓ Idade válida deve retornar 201
  Validação de Email
    ✓ Email sem @ deve retornar 400
    ✓ Email sem ponto deve retornar 400
    ✓ Email válido deve retornar 201
  Validação de Nota
    ✓ Nota menor que 0 deve retornar 400
    ✓ Nota maior que 10 deve retornar 400
    ✓ Nota válida deve retornar 201
  Regra de Negócio - Status
    ✓ Nota 7 → Aprovado
    ✓ Nota 6.9 → Reprovado
    ✓ Nota 10 → Aprovado
    ✓ Nota 0 → Reprovado
  Cadastro Completo
    ✓ Cadastro válido retorna aluno com status correto
    ✓ GET /alunos retorna lista com aluno cadastrado
  Email Duplicado
    ✓ Email duplicado deve retornar 400

Test Suites: 1 passed
Tests:       19 passed
```

### Frontend — Framework Próprio (Vanilla JS, 18 testes)

| Suíte | Casos |
|---|---|
| Nome | 3 casos |
| Idade | 3 casos |
| Email | 3 casos |
| Nota | 3 casos |
| Status | 4 casos |
| Cadastro Completo | 1 caso |
| Email Duplicado | 1 caso |

Executados no navegador sem dependências externas — clique em **Rodar Testes** no `index.html`.

---

## 💡 Destaques Técnicos

- **Factory function no Express** (`createApp`): permite criar uma instância isolada do app em cada teste, evitando contaminação de estado entre os casos.
- **Framework de testes próprio**: implementação manual de `teste()`, `assert()` e `esperarErro()` no frontend, sem nenhuma biblioteca externa.
- **Separação de camadas** em ambas as implementações: Model → Service → Interface/Rota.
- **Isolamento por `beforeEach`**: cada teste do backend parte de um estado limpo, com um novo `AlunoService` sem alunos cadastrados.

---

## 👨‍💻 Autor

**Jean Vitor Da Silva Lopes**

[![GitHub](https://img.shields.io/badge/GitHub-JeanVitorDSL-black?logo=github)](https://github.com/JeanVitorDSL)

---

> Projeto desenvolvido com fins acadêmicos e de portfólio.
