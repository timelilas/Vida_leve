# Pipoca_Agil
App mobile com o objetivo de uma vida mais saudável


## Backend Node.js com TypeScript e MySQL
Este é um projeto de backend desenvolvido em Node.js utilizando TypeScript, Sequelize como ORM para interação com MySQL, e Docker para o ambiente de desenvolvimento.

Utilizamos o docker para elimina inconsistências que podem surgir entre diferentes ambientes de desenvolvimento, como variações de sistema operacional e configurações de software.

### Scripts Disponíveis
No diretório do projeto, você pode executar:

* `npm run dev` : Inicia o servidor em modo de desenvolvimento utilizando ts-node-dev.
* `npm run start` : Inicia o servidor em produção a partir dos arquivos compilados.
* `npm run db:reset` : Reinicia o banco de dados executando drop, create, migrate e seed.
* `npm run build` : Compila o código TypeScript para JavaScript.
* `npm run prestart` : Compila o código TypeScript, realiza o reset do banco de dados e inicia o servidor.

### Dependências 

*   Express (^4.19.2): Framework web para Node.js.
*   Sequelize (^6.37.3): ORM (Object-Relational Mapping) para banco de dados SQL.
*   Sequelize CLI (^6.6.2): CLI para Sequelize, usado para gerenciar migrações e seeders.
*   TypeScript (^5.5.3): Linguagem que adiciona tipagem estática opcional ao JavaScript.
*   dotenv (^16.4.5): Carrega variáveis de ambiente de um arquivo .env para process.env.

### Estrutura do projeto

        /src
        │
        ├── /database
        │   ├── /config
        │   │   └── dbConfig.ts
        │   │   └── dbConfig.js       
        │   ├── /migrations
        │   ├── /models
        │   └── /seeders
        │
        ├── /controllers
        ├── /middlewares
        ├── /routes
        ├── /services
        ├── /utils
        │
        ├── .Dockerfile
        ├── .Sequelizerc
        ├── app.ts
        └── server.ts
