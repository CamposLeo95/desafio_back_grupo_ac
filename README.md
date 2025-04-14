# 📌 Transferência (Back end)

![Badge de Status](https://img.shields.io/badge/status-CONCLUIDO-green)

Backend de uma API para realização de transferências entre usuarios feita para o desafio do GRUPO ADRIANO COBBUCIO. 


## 📚 Implementações

- [✅] Criar cadastro
- [✅] Criar Autenticação
- [✅] Criar Transferencia entre usuarios
- [✅] Validar se o usuario possui saldo
- [✅] Passivel de reversão do valor enviado

## ⚙️ Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- 🔹 [Node JS](#)
- 🔹 [Typescript](#)
- 🔹 [Postgres](#)
- 🔹 [Prisma](#)
- 🔹 [JWT](#)
- 🔹 [Express](#)
- 🔹 [Docker](#)


## 🛠️ Instalação e Configuração
### 📌 Pré-requisitos
Antes de começar, certifique-se de ter instalado:

Node.js (versão 23+)

PostgreSQL (ou use o Docker)

Docker e Docker Compose (opcional, para ambiente isolado)

#### 📥 Clone o repositório

```bash
git clone https://github.com/CamposLeo95/desafio_back_grupo_ac.git
cd desafio_back_grupo_ac
```

#### 📦 Instale as dependências

```bash
npm install
```

#### 🔧 Configuração do Ambiente

Crie uma pasta .env e preencha as variaveis

```bash
PORT=
DATABASE_URL=
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
JWT_SECRET=
FAKE_BD=
```

## 🚀 Como Executar o Projeto

##### Opção 1

Aqui foi criado um banco de dados fake e um postgres com prisma 

Para rodar o fake basta iniciar a aplicaçao com docker ou npm run dev e deixar a variavel FAKE_DB=true

#### 🔥 Rodando em Desenvolvimento
```bash
npx prisma generate && npm run dev
```
##### Opção 2

Caso queira iniciar com postgres e prisma inicie o FAKE_DB=false

#### 🐳 Rodando com Docker
```bash
docker-compose up --build
```
Obs: A primeira vez que rodar provavelmente dará erro pedindo que crie as tabelas no DB. Então siga os passos para criar o banco

#### 🎲 Crie o banco de dados

Crie o banco de dados e configure as tabelas em SQL de acordo com o arquivo 

```bash
projeto/
│-- 📂SQL/
│   ├── create_tables.sql
```
Após criar o DB rode o comando novamente!

```bash
docker-compose up --build
```

## 📌 Rotas e Endpoints

### 🏷️ Autenticação
| Método | Rota             | Descrição           | Type-data       | Data              |
|--------|------------------|---------------------|-----------------|-------------------|
| POST   | `/login`        | Autenticação        | JSON            |  email:string / password:string |

### 📝 Users
| Método | Rota             | Descrição            | Type-data       | Data              |
|--------|------------------|----------------------|-----------------|-------------------|
| POST   | `/users`         | Criar usuarios      | JSON        |  name:string / email:string / cpf:string / password:string / admin:boolean |          
| GET    | `/users`  | Buscar usuarios   | JSON        |                   |          
           

### 📝 Transactions
| Método | Rota             | Descrição           | Type-data       | Data              |
|--------|------------------|---------------------|-----------------|-------------------|
| POST   | `/transaction`         | Criar Transação(token)      | JSON        |  amount: number / from_account_number: number / to_account_number: number / description: string  |          
| POST    | `/transaction/reversal/:idTransaction`  | Reverter transaçao(token/admin)    | JSON               | requestId : string                 |            
| GET    | `/transaction/:account_number`         | Buscar Transaçoes por numero da conta (token)     | -               | -                 |          
 

### 📝 Account
| Método | Rota             | Descrição           | Type-data       | Data              |
|--------|------------------|---------------------|-----------------|-------------------|
| POST   | `/account/credit`    | Creditar valor na conta (token)        | JSON            |  account_number: number / amount: number |          
| GET    | `/account/:id`    | Buscar conta por id (token)        | JSON            |  email / password |    
| GET    | `/accounts`    | Buscar todas as contas        | JSON            |  email / password |    

### 📝 request-reversal
| Método | Rota               | Descrição           | Type-data       | Data              |
|--------|--------------------|---------------------|-----------------|-------------------|
| POST   | `/request-reversal/:idTransaction`| Criar requisiçao de estorno    | JSON            | description: string                 |          
| GET    | `/request-reversal`| Buscar todas as requisicoes de extorno | JSON             | content                |   
| PUT    | `/request-reversal/pending/:idRequestReversal`             | Alterar status para pendente    | -            |                       |          
| PUT    | `/request-reversal/reject/:idRequestReversal`| Alterar status para  rejeitado | -               | -                 |       


## 📂 Estrutura do Projeto

```bash
projeto/
│-- 📂@types/
│-- 📂node_modules/
│-- 📂prisma/
│-- 📂Request/
│-- 📂SQL/
│-- 📂src/
│   ├── 📂 app/
│       ├── 📂services/
│       ├── 📂 use-cases/
│           ├── 📂 account/
│           ├── 📂 auth/
│           ├── 📂 request-reversal/
│           ├── 📂 transactions/
│           ├── 📂 user/
│   ├── 📂domain/
│       ├── 📂 entities/
│       ├── 📂 Repositories/
│       ├── 📂 types/
│   ├── 📂infra/
│       ├── 📂 Container/
│       ├── 📂 db/
│           ├── Faker/
│               ├── 📂repositories/
│           ├── Prisma/
│               ├── 📂repositories/
│   ├── 📂interfaces/
│       ├── 📂 controllers/
│       ├── 📂 routes/
│   ├── 📂middlewares/
│   ├── 📂shared/
│       ├── 📂exceptions/
│       ├── 📂types/
│       ├── 📂utils/
│   ├── main.ts
│   ├── server.ts
│-- .env
│-- .env.example
│-- .gitignore
│-- docker-compose.yml
│-- Dockerfile
│-- package-lock.json
│-- package.json
│-- README.md
│-- tsconfig.json
```