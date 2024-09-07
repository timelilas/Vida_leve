import 'package:flutter/material.dart';
import 'package:vida_leve/telas/queremos_conhecer.dart';
import 'package:flutter/services.dart';

class InfoNutricionais extends StatefulWidget {
  const InfoNutricionais({super.key});

  @override
  State<InfoNutricionais> createState() => _AutenticacaoState();
}

class _AutenticacaoState extends State<InfoNutricionais> {
  TextEditingController _alturaController = TextEditingController();
  TextEditingController _peso_atualController = TextEditingController();
  TextEditingController _peso_desejadoController = TextEditingController();
  TextEditingController _atividade_opController = TextEditingController();

  List<bool> _isSubtextVisible = [false, false, false, false];

  void _toggleSubtext(int index) {
    setState(() {
      _isSubtextVisible[index] = !_isSubtextVisible[index];
    });
  }

  void botaoPrincipalClicado() {
    String altura = _alturaController.text;
    String peso = _peso_atualController.text;
    String desejado = _peso_desejadoController.text;
    String atividado_op = _atividade_opController.text;
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
                        decoration: InputDecoration(
                          labelText: 'ex: 1.80',
                          fillColor: Colors.white,
                          filled: true,
                          border: OutlineInputBorder(),
                        ),
                        keyboardType:
                            TextInputType.numberWithOptions(decimal: true),
                        inputFormatters: [
                          FilteringTextInputFormatter.allow(RegExp(r'[0-9.]')),
                          formatarTextoAltura(),
                        ],
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
                        decoration: InputDecoration(
                          labelText: 'ex: 100.0',
                          fillColor: Colors.white,
                          filled: true,
                          border: OutlineInputBorder(),
                        ),
                        keyboardType:
                            TextInputType.numberWithOptions(decimal: true),
                        inputFormatters: [
                          FilteringTextInputFormatter.allow(RegExp(r'[0-9.]')),
                          formatarTextoPeso(),
                        ],
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
                        decoration: InputDecoration(
                          labelText: 'ex: 100.0',
                          fillColor: Colors.white,
                          filled: true,
                          border: OutlineInputBorder(),
                        ),
                        keyboardType:
                            TextInputType.numberWithOptions(decimal: true),
                        inputFormatters: [
                          FilteringTextInputFormatter.allow(RegExp(r'[0-9.]')),
                          formatarTextoPeso(),
                        ],
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
                          color: Color.fromARGB(255, 45, 45, 47),
                        ),
                      ),
                      const SizedBox(
                        height: 12,
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () => _toggleSubtext(0),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: _isSubtextVisible[0]
                                    ? Colors.orange
                                    : const Color.fromARGB(255, 209, 211, 212),
                                shape: RoundedRectangleBorder(),
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text('Pouca atividade'),
                                  if (_isSubtextVisible[0])
                                    Text(
                                      'Pouco tempo em pé. p. ex. home office/escritório',
                                      style: TextStyle(
                                          fontSize: 12, color: Colors.white70),
                                    ),
                                ],
                              ),
                            ),
                          ),
                          SizedBox(height: 10),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () => _toggleSubtext(1),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: _isSubtextVisible[1]
                                    ? Colors.orange
                                    : Color.fromARGB(255, 209, 211, 212),
                                shape: RoundedRectangleBorder(),
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text('Atividade leve'),
                                  if (_isSubtextVisible[1])
                                    Text(
                                      'Pouco tempo em pé. p. ex. home office/escritório',
                                      style: TextStyle(
                                          fontSize: 12, color: Colors.white70),
                                    ),
                                ],
                              ),
                            ),
                          ),
                          SizedBox(height: 10),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () => _toggleSubtext(2),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: _isSubtextVisible[2]
                                    ? Colors.orange
                                    : Color.fromARGB(255, 209, 211, 212),
                                shape: RoundedRectangleBorder(),
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text('Atividade moderada'),
                                  if (_isSubtextVisible[2])
                                    Text(
                                      'Pouco tempo em pé. p. ex. home office/escritório',
                                      style: TextStyle(
                                          fontSize: 12, color: Colors.white70),
                                    ),
                                ],
                              ),
                            ),
                          ),
                          SizedBox(height: 10),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () => _toggleSubtext(3),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: _isSubtextVisible[3]
                                    ? Colors.orange
                                    : Color.fromARGB(255, 209, 211, 212),
                                shape: RoundedRectangleBorder(),
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text('Atividade intensa'),
                                  if (_isSubtextVisible[3])
                                    Text(
                                      'Pouco tempo em pé. p. ex. home office/escritório',
                                      style: TextStyle(
                                          fontSize: 12, color: Colors.white70),
                                    ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: () {
                          botaoPrincipalClicado();
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => QueremosConhecer()),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(),
                          backgroundColor: Color(0xFFFFAE31),
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

class formatarTextoAltura extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    final RegExp regExp = RegExp(r'^\d{0,2}(\.\d{0,2})?$');

    if (regExp.hasMatch(newValue.text)) {
      return newValue;
    }
    return oldValue;
  }
}

class formatarTextoPeso extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    final RegExp regExp = RegExp(r'^\d{0,3}(\.\d?)?$');

    if (regExp.hasMatch(newValue.text)) {
      return newValue;
    }
    return oldValue;
  }
}
