# Pipoca Ágil

Aplicativo mobile de contagem de calorias para promover uma vida mais saudável.

## Script para desenvolvimento

Estamos utilizando o DOCKER para implantar e executar o projeto em contêineres, tenha em mente que você precisa telo em sua maquina para a visualização. Isso elimina problemas comuns de “funciona na minha máquina” ao mover aplicações entre diferentes ambientes (desenvolvimento, teste, produção).

Siga os seguintes passo para a visualização do projeto:

- Primeiro vamos faz o clone do projeto, em seu terminal utilize o seguinte comando `git clone git@github.com:timelilas/Vida_leve.git`.
- Entre na pasta do projeto `cd Vida_leve`.
- Execute o comando `docker compose up -d --build` para subir os container no Docker.
- Quando o docker estiver de montado entre na pasta `cd backend`
- Crie um arquivo .env na pasta backend com as variáveis de ambiente presentes em .env.sample
- Execute `npm run build` para compilar o projeto e carregar as configurações das migrations.
- execute `npm run db:setup`, para iniciar a construção das tabelas no banco de dados.

Agora e so aproveitar <a>http://localhost:8080</a>

> **Observação**
> O id do usuário é obtido após a validação do token JWT e armazenado em `req.user`.
> Dessa forma todas as rotas que exigem autenticação conseguem acessar o id do usuário após
> a validação do token.

## API:

<a>http://localhost:3000</a>

#### POST `/auth/login` :

    Entrada:
    {
        "email": "root@root.comm",
        "senha": "Test123!."
    }

    Saida:
    {
        data:{
            "id": 4,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJyb290QHJvb3QuY29tbSIsInNlbmhhIjoiJDJhJDEwJEswZGVKc2JvSmM4WnNOMWJzSDVRNnVMS3c1dnFJRVc2ZXh5NU1HM3NWMXpMTXpHZHY2NmplIiwiaWF0IjoxNzI1NDEzNDAwLCJleHAiOjIxOTg3Nzc0MDB9.vXldqXKlWEZzsKwbk5a_0bIXbKHu83ec2ZoZHsVH2GU"
        }
    }

#### POST `/auth/signup` :

    Entrada:
    {
        "userName": "Test",
        "email": "root@root.comm",
        "senha": "Test123!."
    }

    Saida:
    {
        "data":{
            "id": 1,
            "userName": "Test",
            "email": "root@root.comm",
            "telefone": null,
            "aniversario": null
            "sexo": null
        }
    }

#### GET `/user/profile` :

    Saída:
    {
        "data": {
            "id": 1,
            "email": "teste@email.com,
            "userName": "Test Jr",
            "telefone": "11 987654321",
            "aniversario": "1990-01-01",
            "sexo": "masculino"
        }
    }

#### PUT `/user/profile/` :

    Entrada:
    {
        "userName": "Test Jr",
        "telefone": "11 987654321",
        "aniversario": "1990-01-01",
        "sexo": "masculino"
    }

    Saida:
    {
        "data": {
            "id": 1
            "email": teste@email.com"
            "userName": "Test Jr",
            "telefone": "11 987654321",
            "aniversario": "1990-01-01",
            "sexo": "masculino"
        }
    }

#### POST `/progress/`

    Entrada:
    {
        "altura": 1.25,
        "peso": 80.4,
        "meta": 30,
        "atividade": "leve"
    }

    Saida:
    {
        "data": {
            "id": 1
            "altura": 1.25,
            "peso": 80.4,
            "meta": 30,
            "atividade": "leve"
        }
    }

## Copyright

This work is licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivs 4.0 International License][cc-by-nc-nd].

[![CC BY-NC-ND 4.0][cc-by-nc-nd-image]][cc-by-nc-nd]

[cc-by-nc-nd]: http://creativecommons.org/licenses/by-nc-nd/4.0/
[cc-by-nc-nd-image]: https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png
[cc-by-nc-nd-shield]: https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg
