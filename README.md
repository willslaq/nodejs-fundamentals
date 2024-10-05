# Node.js Task Manager

Este projeto foi desenvolvido durante o primeiro módulo da Formação em NodeJS sendo estudada através da Rocketseat, uma aplicação Node.js que demonstra os fundamentos do Node.js, fazendo de forma mais crua possível a gestão de rotas da API, persistência de dados, middlewares e utiliza streams para importação e processamento de dados de um arquivo CSV. A aplicação possui um servidor com seis rotas principais para gerenciar tarefas.

## Funcionalidades

- **Listar Tasks**: Rota GET `/tasks` que lista todas as tasks ou filtra através do parâmetro `title`
- **Cadastrar Task**: Rota POST `/tasks` que cadastra uma nova task com os parâmetros obrigatórios `title` e `description`.
- **Atualizar uma Task**: Rota PUT `/tasks/:id` que pode receber tanto o parâmetro  `title` quanto `description`.
- **Completar uma Task**: Rota PATCH `/tasks/:id/complete` que ao ser chamada completa uma task que ainda não esteja completa(Caso já esteja completa retornará 400).
- **Deletar uma Task**: Rota DELETE `/tasks/:id` que deleta a task passada pela rota.
- **Cadastrar Tasks importadas via CSV**: Rota POST `/upload-tasks` que ao ser chamada processa via stream o arquivo do diretório `./csv/tasks.csv` e importa de forma assíncrona todas as tasks do arquivo.

## Tecnologias Utilizadas

- Node.js
- Streams
- CSV Parsing

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/willslaq/nodejs-fundamentals
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```

## Uso

Na raíz do projeto há um arquivo Insomnia com as rotas já pré configuradas para serem utilizadas para testes após iniciar o servidor.

### Iniciar o Servidor

Para iniciar o servidor, execute:
```bash
npm run dev
```

## Referência

 - [Desafio referente ao módulo: Fundamentos do Node.js](https://efficient-sloth-d85.notion.site/Desafio-01-2d48608f47644519a408b438b52d913f)
