# TaskFlow Backend v2

Este é o repositório backend da aplicação TaskFlow, desenvolvida com Node.js, Express e TypeScript, utilizando PostgreSQL como banco de dados. Ele oferece uma API RESTful para gerenciamento de usuários e tarefas.

## 🚀 Funcionalidades

- **Gerenciamento de Usuários:**
    - Registro de novos usuários.
    - Login de usuários (Ainda não implementado, placeholder para futura autenticação JWT).
- **Gerenciamento de Tarefas (CRUD Completo):**
    - Criar novas tarefas.
    - Listar todas as tarefas de um usuário.
    - Buscar uma tarefa específica por ID.
    - Atualizar detalhes de uma tarefa.
    - Deletar uma tarefa.

## 🛠️ Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript.
- **Express.js:** Framework web para Node.js.
- **TypeScript:** Linguagem de programação que adiciona tipagem estática ao JavaScript.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional.
- **`pg`:** Driver Node.js para PostgreSQL.
- **`pg-migrate`:** Ferramenta para gerenciamento de migrações de banco de dados.
- **`nodemon`:** Ferramenta para monitorar mudanças no código e reiniciar o servidor automaticamente.

##  Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/download/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js, geralmente vem com o Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (e um cliente como [pgAdmin](https://www.pgadmin.org/download/) para gerenciamento visual)

## ⚙️ Configuração e Execução

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### 1. Clonar o Repositório

```bash
cd taskflow-backend-v2