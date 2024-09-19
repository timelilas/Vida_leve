import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vida_leve/componentes/decoracao_campo_autenticacao.dart';
import 'package:vida_leve/model/user.dart';
import 'package:vida_leve/servicos/autenticacao_servico.dart';
import 'package:vida_leve/telas/queremos_conhecer.dart';

class Autenticacao extends StatefulWidget {
  final bool escolherTela;
  const Autenticacao({super.key, required this.escolherTela});

  @override
  State<Autenticacao> createState() => _AutenticacaoState();
}

class _AutenticacaoState extends State<Autenticacao> {
  late bool queroEntrar = widget.escolherTela;
  bool _obscureText = true; // Variável que define se o texto estará oculto
  bool _obscureTextConf = true;
  final _formKey = GlobalKey<FormState>();

  TextEditingController _emailController = TextEditingController();
  TextEditingController _senhaController = TextEditingController();
  TextEditingController _confirmarSenhaController = TextEditingController();
  TextEditingController _nomeController = TextEditingController();
  AutenticacaoServico _autenticacaoServico = AutenticacaoServico();

  // Função para alternar a visibilidade da senha
  void _togglePasswordVisibility() {
    setState(() {
      _obscureText = !_obscureText;
    });
  }

  void _togglePasswordVisibilityConfir() {
    setState(() {
      _obscureTextConf = !_obscureTextConf;
    });
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
                        "assets/logo.png",
                        height: 100,
                      ),
                      const Text(
                        "Boas vindas!",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const Text(
                        "Entre em sua conta para continuar",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      Visibility(
                        visible: !queroEntrar,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Como você gostaria de ser chamado?",
                              style: TextStyle(fontSize: 16),
                            ),
                            Container(
                              height: 60,
                              child: TextFormField(
                                controller: _nomeController,
                                decoration:
                                    getAutenticacaoDecoracao("ex: Nome"),
                                maxLength: 40,
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
                            ),
                          ],
                        ),
                      ),
                      Text(
                        "Endereço de e-mail",
                        style: TextStyle(fontSize: 16),
                      ),
                      Container(
                        height: 80,
                        child: TextFormField(
                          controller: _emailController,
                          decoration: getAutenticacaoDecoracao(
                              "ex: vidaleve@vidaleve.com"),
                          maxLength: 30,
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
                      ),
                      Text("Senha", style: TextStyle(fontSize: 16)),
                      Container(
                        height: 60,
                        child: TextFormField(
                          controller: _senhaController,
                          obscureText: _obscureText,
                          maxLength: 10,
                          decoration: InputDecoration(
                            labelText: '**********',
                            fillColor: Colors.white,
                            filled: true,
                            contentPadding:
                                const EdgeInsets.fromLTRB(16, 8, 8, 8),
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10.0)),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                            suffixIcon: IconButton(
                              icon: Icon(
                                _obscureText
                                    ? Icons.visibility_off
                                    : Icons.visibility, // Ícone do olho
                              ),
                              onPressed:
                                  _togglePasswordVisibility, // Função para alternar a visibilidade
                            ),
                          ),
                          // validator: (String? value) {
                          //  String? validationMessage =
                          //      PasswordValidator.validate(value ?? '');
                          //  if (validationMessage != null) {
                          //    return validationMessage;
                          //  }
                          //  return null;
                          // },
                        ),
                      ),
                      Visibility(
                        visible: !queroEntrar,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Confirmar sua senha",
                              style: TextStyle(fontSize: 16),
                            ),
                            Container(
                              height: 60,
                              child: TextFormField(
                                controller: _confirmarSenhaController,
                                obscureText: _obscureTextConf,
                                maxLength: 10,
                                decoration: InputDecoration(
                                  labelText: '**********',
                                  fillColor: Colors.white,
                                  filled: true,
                                  contentPadding:
                                      const EdgeInsets.fromLTRB(16, 8, 8, 8),
                                  border: OutlineInputBorder(
                                      borderRadius:
                                          BorderRadius.circular(10.0)),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  suffixIcon: IconButton(
                                    icon: Icon(
                                      _obscureTextConf
                                          ? Icons.visibility_off
                                          : Icons.visibility, // Ícone do olho
                                    ),
                                    onPressed:
                                        _togglePasswordVisibilityConfir, // Função para alternar a visibilidade
                                  ),
                                ),
                                validator: (String? value) {
                                  if (value == null || value.isEmpty) {
                                    return "Por favor, confirme sua senha.";
                                  }
                                  if (value != _senhaController.text) {
                                    return "As senhas não coincidem.";
                                  }
                                  return null;
                                },
                              ),
                            ),
                          ],
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          String senha = _senhaController.text;

                          if (!validarSenha(senha)) {
                            mostrarModalErroSenha(context);
                            return;
                          }

                          botaoPrincipalClicado();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Color.fromARGB(
                              255, 248, 174, 63), // Cor de fundo laranja
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(
                                18.0), // Bordas arredondadas
                            side: BorderSide(
                                color: const Color.fromARGB(255, 87, 87, 87),
                                width: 2.0), // Borda preta com largura de 2
                          ),
                          padding: EdgeInsets.symmetric(
                              horizontal: 20, vertical: 15), // Tamanho do botão
                        ),
                        child: Text((queroEntrar) ? "ENTRAR" : "Cadastrar",
                            style: TextStyle(
                              fontSize: 14, // Tamanho do texto
                              color: const Color.fromARGB(
                                  255, 10, 10, 10), // Cor do texto
                              fontWeight: FontWeight.bold, // Negrito opcional
                            )),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      TextButton(
                        onPressed: () {
                          setState(() {
                            queroEntrar = !queroEntrar;
                          });
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color.fromARGB(
                              255, 207, 207, 207), // Cor de fundo laranja
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(
                                18.0), // Bordas arredondadas
                            side: BorderSide(
                                color: const Color.fromARGB(255, 87, 87, 87),
                                width: 2.0), // Borda preta com largura de 2
                          ),
                          padding: EdgeInsets.symmetric(
                              horizontal: 20, vertical: 15), // Tamanho do botão
                        ),
                        child: Text(
                            (queroEntrar)
                                ? "Cadastre-se aqui!"
                                : "Já tem uma conta? Entre",
                            style: TextStyle(
                              fontSize: 14, // Tamanho do texto
                              color: const Color.fromARGB(
                                  255, 10, 10, 10), // Cor do texto
                              fontWeight: FontWeight.bold, // Negrito opcional
                            )),
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

  @override
  void dispose() {
    _confirmarSenhaController.dispose();
    _emailController.dispose();
    _senhaController.dispose();
    _nomeController.dispose();
    super.dispose();
  }

  bool validarSenha(String senha) {
    bool hasMinLength = senha.length >= 7;
    bool hasUppercase = senha.contains(RegExp(r'[A-Z]'));
    bool hasLowercase = senha.contains(RegExp(r'[a-z]'));
    bool hasDigit = senha.contains(RegExp(r'[0-9]'));
    bool hasSpecialCharacter = senha.contains(RegExp(r'[!@#\$%&*]'));

    return hasMinLength &&
        hasUppercase &&
        hasLowercase &&
        hasDigit &&
        hasSpecialCharacter;
  }

  void mostrarModalErroSenha(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Erro de Validação de Senha"),
          content: Text(
            "A senha deve atender aos seguintes critérios:\n"
            "• Pelo menos 7 caracteres.\n"
            "• Pelo menos uma letra maiúscula.\n"
            "• Pelo menos uma letra minúscula.\n"
            "• Pelo menos um número.\n"
            "• Pelo menos um caractere especial (!@#\$%&*).",
          ),
          actions: <Widget>[
            ElevatedButton(
              child: Text("OK"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  void botaoPrincipalClicado() async {
    int? usuarioId;
    String userName = _nomeController.text;
    String email = _emailController.text;
    String senha = _senhaController.text;

    if (_formKey.currentState!.validate()) {
      if (queroEntrar) {
        // Chama a API para autenticar o usuário
        usuarioId = await _autenticacaoServico.autenticarUsuario(
            email: email, senha: senha, context: context);
        Provider.of<User>(context, listen: false).manterID(usuarioId!);
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => QueremosConhecer()),
        );
      } else {
        // Chama a API para cadastrar o usuário
        usuarioId = await _autenticacaoServico.cadastrarUsuario(
            userName: userName, email: email, senha: senha, context: context);
        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => Autenticacao(escolherTela: true)),
        );
      }
    } else {
      print("Formulário inválido");
    }
  }
}
