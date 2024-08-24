import 'package:flutter/material.dart';
import 'package:vida_leve/componentes/decoracao_campo_autenticacao.dart';
import 'package:vida_leve/model/validar_senha.dart';
import 'package:vida_leve/servicos/autenticacao_servico.dart';

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
  AutenticacaoServico _autenticacaoServico = AutenticacaoServico();

  final _formKey = GlobalKey<FormState>();

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
                  Color(0xFFEFF0F6),
                  Color(0xFFEFF0F6),
                ])),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Center(
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Image.asset(
                        "assets/logo.png",
                        height: 200,
                      ),
                      const Text(
                        "Boas vindas!",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const Text(
                        "Cadastre-se para continuar",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const SizedBox(
                        height: 32,
                      ),
                      TextFormField(
                        controller: _emailController,
                        decoration: getAutenticacaoDecoracao("Email"),
                        validator: (String? value) {
                          if (value == null) {
                            return "O e-mail não pode ser vazio.";
                          }
                          if (value.length < 5) {
                            return "E-mail muito pequeno";
                          }
                          if (!value.contains("@")) {
                            return "E-mail não é valido.";
                          }
                          return null;
                        },
                      ),
                      const SizedBox(
                        height: 22,
                      ),
                      TextFormField(
                        controller: _senhaController,
                        decoration: getAutenticacaoDecoracao("Senha"),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Por favor, insira uma senha.';
                          } else if (!PasswordValidator.isValid(value)) {
                            return 'A senha deve conter:\n'
                                '- Pelo menos 8 caracteres de extensão\n'
                                '- Pelo menos 3 dos seguintes:\n'
                                '  Letras minúsculas (a-z)\n'
                                '  Letras maiúsculas (A-Z)\n'
                                '  Números (0-9)\n'
                                '  Caracteres especiais (!@#\$%&*)';
                          }
                          return null;
                        },
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
                              validator: (String? value) {
                                if (value == null) {
                                  return "A senha não pode ser vazio.";
                                }
                                if (value.length <= 8) {
                                  return "Senha deve ser igual ou maior que 8.";
                                }
                                if (value.length >= 10) {
                                  return "Senha deve ser igual ou menor que 10.";
                                }
                                return null;
                              },
                              obscureText: true,
                            ),
                            const SizedBox(
                              height: 20,
                            ),
                            TextFormField(
                              controller: _nomeController,
                              decoration: getAutenticacaoDecoracao("Nome"),
                              validator: (String? value) {
                                if (value == null) {
                                  return "O nome não pode ser vazio.";
                                }
                                if (value.length < 4) {
                                  return "Nome muito pequeno";
                                }
                                if (value.length < 20) {
                                  return "Nome muito grande.";
                                }
                                return null;
                              },
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
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              Color(0xFFFFAE31), // Cor de fundo do botão
                        ),
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

  botaoPrincipalClicado() {
    String nome = _senhaController.text;
    String email = _emailController.text;
    String senha = _senhaController.text;

    if (_formkey.currentState!.validate()) {
      if (queroEntrar) {
        print("Permitido ${_emailController.text}" +
            "${_nomeController.text}" +
            "${_senhaController.text}");
      } else {
        print("Não Permitido cadastro");
        print(
            "${_emailController.text},${_senhaController.text},${_nomeController.text},");
        _autenticacaoServico.cadastrarUsuario(
            nome: nome, senha: senha, email: email);
      }
    } else {
      print("Não Permitido Formulario");
    }
  }
}
