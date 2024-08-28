# Pipoca Agil
App mobile com o objetivo de uma vida mais saudável

## Script para desenvolvimento

Estamos utilizando o DOCKER para implantar e executar o projeto em contêineres, tenha em mente que você precisa telo em sua maquina para a visualização. Isso elimina problemas comuns de “funciona na minha máquina” ao mover aplicações entre diferentes ambientes (desenvolvimento, teste, produção).

Siga os seguintes passo para a visualização do projeto:

* Primeiro vamos faz o clone do projeto, em seu terminal utilize o seguinte comando `git clone git@github.com:timelilas/Vida_leve.git`.
* Entre na pasta do projeto `cd Vida_leve`.
* Execute o comando `docker compose up -d --build` para subir os container no Docker.
* Quando o docker estiver de montado entre na pasta `cd backend` e execute `npm run prestart`, para a contrução das tabelas no banco de dados.

Agora e so aproveitar <a>http://localhost:8080</a> 

## API:
<a>http://localhost:3000</a>

#### POST `/login` :
    Entrada:
    {
        "email": "root@root.comm",
        "password": "Test123!."
    }

    Saida:
    {
        "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyb290QHJvb3QuY29tbSIsInBhc3N3b3JkIjoiJDJhJDEwJHI0SWl5amJFRnczelQuUzBKUm1sRk9vVmdaQThiTUR0OUY5UnpPazV0VEVMS1dYLnFJLkZlIiwiaWF0IjoxNzI0ODYxMTY2LCJleHAiOjIxOTgyMjUxNjZ9.hrfhfGwkyRtcdwXQRSdEBINd3ICvtD9Gnq1xXTnngR8"
    }


#### POST `/login/create` :
    Entrada:
    {
        "userName": "Test",
        "email": "root@root.comm",
        "password": "Test123!."
    }

    Saida:
    {
        "message": 2
    }
