import 'package:flutter/material.dart';
import 'package:vida_leve/_comum/fonts.dart';
import 'package:vida_leve/componentes/decoracao_campo_autenticacao.dart';
import 'package:vida_leve/servicos/api_service.dart';

class Autenticacao extends StatefulWidget {
  const Autenticacao({super.key});

  @override
  State<Autenticacao> createState() => _AutenticacaoState();
}

class _AutenticacaoState extends State<Autenticacao> {
  bool queroEntrar = true;
  final _formkey = GlobalKey<FormState>();

  TextEditingController _emailController = TextEditingController();
  TextEditingController _senhaController = TextEditingController();
  TextEditingController _nomeController = TextEditingController();
  ApiService _apiService = ApiService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blueGrey,
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                  CoresApp.azulBaixoGradiente,
                  CoresApp.azulEscuro
                ])),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formkey,
              child: Center(
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Image.asset(
                        "assets/mamon.png",
                        height: 128,
                      ),
                      const Text(
                        "Porra! Blaid",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 48,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(
                        height: 32,
                      ),
                      TextFormField(
                        controller: _emailController,
                        decoration: getAutenticacaoDecoracao("Email"),
                        validator: (String? value) {
                          if (value == null) {},
                      ),
                      const SizedBox(
                        height: 22,
                      ),
                      TextFormField(
                        controller: _senhaController,
                        decoration: getAutenticacaoDecoracao("Senha"),
                        validator: (String? value) {},
                        obscureText: true,
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      Visibility(
                        visible: !queroEntrar,
                        child: Column(
                          children: [
                            TextFormField(
                              decoration:
                                  getAutenticacaoDecoracao("Confirmar Senha"),
                              validator: (String? value) {},
                              obscureText: true,
                            ),
                            const SizedBox(
                              height: 20,
                            ),
                            TextFormField(
                              controller: _nomeController,
                              decoration: getAutenticacaoDecoracao("Nome"),
                              validator: (String? value) {},
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 30,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          botaoPrincipalClicado();
                        },
                        child: Text((queroEntrar) ? "ENTRAR" : "Cadastrar"),
                      ),
                      const Divider(),
                      TextButton(
                          onPressed: () {
                            setState(() {
                              queroEntrar = !queroEntrar;
                            });
                          },
                          child: Text((queroEntrar)
                              ? "Cadastre-se aqui!"
                              : "Já tem uma conta?")),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  botaoPrincipalClicado() async {
    String nome = _nomeController.text;
    String email = _emailController.text;
    String senha = _senhaController.text;

    if (_formkey.currentState!.validate()) {
      if (queroEntrar) {
        final response = await _apiService.postData('/login', {
          'email': email,
          'password': senha,
        });

        print(response['message']);
        if (response != null && response['message'] != null) {
          // Processar o token ou redirecionar para outra tela
          print("Login bem-sucedido: ${response['message']}");
        } else {
          print("Falha no login: ${response['error']}");
        }
      } else {
        final response = await _apiService.postData('/login/create', {
          // 'nome': nome,
          'email': email,
          'password': senha,
        });
        if (response != null && response['id'] != null) {
          print("Cadastro bem-sucedido: ${response['id']}");
        } else {
          print("Falha no login: ${response['error']}");
        }
      }
    } else {
      print("Formulário inválido");
    }
  }
}
