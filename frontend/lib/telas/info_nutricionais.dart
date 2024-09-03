import 'package:flutter/material.dart';
import 'package:vida_leve/componentes/decoracao_campo_autenticacao.dart';
import 'package:vida_leve/model/validar_senha.dart';
import 'package:vida_leve/telas/queremos_conhecer.dart';

class InfoNutricionais extends StatefulWidget {
  const InfoNutricionais({super.key});

  @override
  State<InfoNutricionais> createState() => _AutenticacaoState();
}

class _AutenticacaoState extends State<InfoNutricionais> {
  bool queroEntrar = true;
  final _formkey = GlobalKey<FormState>();

  TextEditingController _alturaController = TextEditingController();
  TextEditingController _peso_atualController = TextEditingController();
  TextEditingController _peso_desejadoController = TextEditingController();
  TextEditingController _atividade_opController = TextEditingController();
  bool _showAlternateText =
      false; // Estado para controlar a exibição do texto alternativo
  bool _showAlternateText01 =
      false; // Estado para controlar a exibição do texto alternativo

  void _toggleText() {
    setState(() {
      if (_showAlternateText == false) {
        _showAlternateText = !_showAlternateText; //
      } else {
        _showAlternateText01 = !_showAlternateText01;
      }
    });
  }

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
                        "assets/logoperfil.png",
                        height: 200,
                      ),
                      const Text(
                        "Qual a sua meta?",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 25,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                      const Text(
                        "Qual a sua altura?",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      TextFormField(
                        controller: _alturaController,
                        decoration: getAutenticacaoDecoracao(""),
                      ),
                      const SizedBox(
                        height: 32,
                      ),
                      const Text(
                        "Qual é seu peso atual?",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      TextFormField(
                        controller: _peso_atualController,
                        decoration: getAutenticacaoDecoracao(""),
                      ),
                      const SizedBox(
                        height: 32,
                      ),
                      const Text(
                        "Qual é o peso que você deseja alcançar? ",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      TextFormField(
                        controller: _peso_desejadoController,
                        decoration: getAutenticacaoDecoracao(""),
                      ),
                      const SizedBox(
                        height: 32,
                      ),
                      const Text(
                        "Qual é o seu nível de atividade física diária?",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const SizedBox(
                        height: 12,
                      ),

                      ElevatedButton(
                        onPressed: _toggleText,
                        child: Text('Pouca atividade'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              Color(0xFFFFAE31), // Cor de fundo do botão
                        ),
                      ),
                      const SizedBox(
                          height: 10), // Espaçamento entre o botão e o texto
                      if (_showAlternateText == true &&
                          _showAlternateText01 ==
                              false) // Condicional para mostrar o texto alternativo
                        const Text(
                          'Pouco tempo em pé. p. ex. home office/escritório',
                          style: TextStyle(
                              fontSize: 12,
                              color: const Color.fromARGB(255, 70, 71, 71)),
                        ),

                      const SizedBox(
                        height: 12,
                      ),
                      ElevatedButton(
                        onPressed: _toggleText,
                        child: Text('Pouca leve'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              Color(0xFFFFAE31), // Cor de fundo do botão
                        ),
                      ),
                      const SizedBox(
                          height: 10), // Espaçamento entre o botão e o texto
                      if (_showAlternateText01 == true &&
                          _showAlternateText ==
                              false) // Condicional para mostrar o texto alternativo
                        const Text(
                          'Pouco tempo em pé. p. ex. home office/escritório',
                          style: TextStyle(
                              fontSize: 12,
                              color: const Color.fromARGB(255, 70, 71, 71)),
                        ),
                      ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              Color(0xFFFFAE31), // Cor de fundo do botão
                        ),
                        child: Text("Atividade intensa"),
                      ),
                      const SizedBox(
                        height: 35,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => QueremosConhecer()),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              Color(0xFFFFAE31), // Cor de fundo do botão
                        ),
                        child: Text("Salvar alterações"),
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
}
