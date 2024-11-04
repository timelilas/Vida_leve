# Pipoca_Ágil BACK-END
App mobile com o objetivo de uma vida mais saudável


## Backend Node.js com TypeScript e PostgreSQL
Este é um projeto de backend desenvolvido em Node.js utilizando TypeScript, Sequelize como ORM para interação com PostgreSQL, e Docker para o ambiente de desenvolvimento.

Utilizamos o docker para elimina inconsistências que podem surgir entre diferentes ambientes de desenvolvimento, como variações de sistema operacional e configurações de software.

### Scripts Disponíveis
No diretório do projeto, você pode executar:

* `npm run dev` : Inicia o servidor em modo de desenvolvimento utilizando ts-node-dev.
* `npm run build` : Compila o código TypeScript para JavaScript.
* `npm run start` : Inicia o servidor em produção a partir dos arquivos compilados.
* `npm run build` : Compila o código TypeScript para JavaScript.
* `npm run db:reset` : Reinicia o banco de dados executando db:drop, db:create, db:migrate e db:seed.
* `npm run db:setup` : Inicializa o banco de dados executando db:create, db:migrate e db:seed.

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
        ├── .sequelizerc
        ├── app.ts
        └── server.ts


