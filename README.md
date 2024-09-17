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

#### POST `/user/login` :
    Entrada:
    {
        "email": "root@root.comm",
        "senha": "Test123!."
    }

    Saida:
    {
        "id": 4,
        "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJyb290QHJvb3QuY29tbSIsInNlbmhhIjoiJDJhJDEwJEswZGVKc2JvSmM4WnNOMWJzSDVRNnVMS3c1dnFJRVc2ZXh5NU1HM3NWMXpMTXpHZHY2NmplIiwiaWF0IjoxNzI1NDEzNDAwLCJleHAiOjIxOTg3Nzc0MDB9.vXldqXKlWEZzsKwbk5a_0bIXbKHu83ec2ZoZHsVH2GU"
    }


#### POST `/user/create` :
    Entrada:
    {
        "userName": "Test",
        "email": "root@root.comm",
        "senha": "Test123!."
    }

    Saida:
    {
        "message": 2
    }


#### PUT `/user/profile/:id` :
    Entrada:
    {
        "userName": "Test Jr",
        "telefone": "11 987654321",
        "aniversario": "1990-01-01",
        "sexo": "Homem"
    }

    Saida: 
    {
        "message": "Dados completado com sucesso"
    }

#### POST  `/progress/:id`
    Entrada:
    {
        "altura": 1.25,
        "peso": 80.4,
        "meta": 30,
        "atividade": "leve"
    }

    Saida:
    {
        "message": "Dados completos!"
    }