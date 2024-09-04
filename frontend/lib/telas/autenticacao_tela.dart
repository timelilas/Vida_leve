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
  final _formKey = GlobalKey<FormState>();

  TextEditingController _emailController = TextEditingController();
  TextEditingController _senhaController = TextEditingController();
  TextEditingController _confirmarSenhaController = TextEditingController();
  TextEditingController _nomeController = TextEditingController();
  AutenticacaoServico _autenticacaoServico = AutenticacaoServico();

  @override
  void dispose() {
    _emailController.dispose();
    _senhaController.dispose();
    _confirmarSenhaController.dispose();
    _nomeController.dispose();
    ScaffoldMessenger.of(context).clearSnackBars(); // Limpar mensagens
    super.dispose();
  }

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
                        "assets/logoperfil.png",
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
                            return "E-mail não é válido.";
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
                        validator: (String? value) {
                          String? validationMessage =
                              PasswordValidator.validate(value ?? '');
                          if (validationMessage != null) {
                            return validationMessage;
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
                              controller: _confirmarSenhaController,
                              decoration:
                                  getAutenticacaoDecoracao("Confirmar Senha"),
                              validator: (String? value) {
                                if (value == null || value.isEmpty) {
                                  return "Por favor, confirme sua senha.";
                                }
                                if (value != _senhaController.text) {
                                  return "As senhas não coincidem.";
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
                                if (value.length < 2) {
                                  return "Nome muito pequeno";
                                }
                                if (value.length > 20) {
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
                            // Limpar campos ao trocar entre entrar e cadastrar
                            _emailController.clear();
                            _senhaController.clear();
                            _confirmarSenhaController.clear();
                            _nomeController.clear();
                            _formKey.currentState?.reset();
                          });
                        },
                        child: Text((queroEntrar)
                            ? "Cadastre-se aqui!"
                            : "Já tem uma conta? Entre"),
                      ),
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

  void botaoPrincipalClicado() async {
    String nome = _nomeController.text;
    String email = _emailController.text;
    String senha = _senhaController.text;

    if (_formKey.currentState!.validate()) {
      if (queroEntrar) {
        // Chama a API para autenticar o usuário
        await _autenticacaoServico.autenticarUsuario(
            email: email, senha: senha);
      } else {
        // Chama a API para cadastrar o usuário
        await _autenticacaoServico.cadastrarUsuario(
            nome: nome, senha: senha, email: email);
      }
    } else {
      print("Formulário inválido");
    }
  }
}