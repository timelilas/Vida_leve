import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vida_leve/model/user.dart';
import 'package:vida_leve/servicos/nutricionais_service.dart';
import 'package:vida_leve/telas/meta.dart';
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

  NutricionaisService _nutricionaisService = NutricionaisService();

  List<bool> _isSubtextVisible = [false, false, false, false];

  void _toggleSubtext(int index) {
    setState(() {
      _isSubtextVisible[index] = !_isSubtextVisible[index];
    });
  }

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    final usuarioId = Provider.of<User>(context).id;
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
                        height: 50,
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
                          fillColor: const Color.fromARGB(255, 255, 255, 255),
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
                        height: 10,
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
                                    : const Color.fromARGB(255, 254, 255, 255),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                      6.0), // Bordas arredondadas
                                  side: BorderSide(
                                      color:
                                          const Color.fromARGB(255, 70, 68, 68),
                                      width:
                                          1.0), // Borda preta com largura de 2
                                ),
                                padding: EdgeInsets.symmetric(
                                    horizontal: 10, vertical: 5),
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    'Pouca atividade',
                                    style: TextStyle(
                                      fontSize: 14, // Tamanho do texto
                                      color: const Color.fromARGB(
                                          255, 10, 10, 10), // Cor do texto
                                      fontWeight:
                                          FontWeight.bold, // Negrito opcional
                                    ),
                                  ),
                                  if (_isSubtextVisible[0])
                                    Text(
                                      'Pouco tempo em pé. p. ex. home office/escritório',
                                      style: TextStyle(
                                          fontSize: 15,
                                          color: const Color.fromARGB(
                                              179, 10, 10, 10)),
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
                                    : Color.fromARGB(255, 255, 255, 255),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                      6.0), // Bordas arredondadas
                                  side: BorderSide(
                                      color:
                                          const Color.fromARGB(255, 70, 68, 68),
                                      width:
                                          1.0), // Borda preta com largura de 2
                                ),
                                padding: EdgeInsets.symmetric(
                                    horizontal: 10, vertical: 5),
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text('Atividade leve',
                                      style: TextStyle(
                                        fontSize: 14, // Tamanho do texto
                                        color: const Color.fromARGB(
                                            255, 10, 10, 10), // Cor do texto
                                        fontWeight:
                                            FontWeight.bold, // Negrito opcional
                                      )),
                                  if (_isSubtextVisible[1])
                                    Text(
                                      'Pouco tempo em pé. p. ex. home office/escritório',
                                      style: TextStyle(
                                          fontSize: 12,
                                          color: const Color.fromARGB(
                                              179, 7, 7, 7)),
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
                                    : Color.fromARGB(255, 255, 255, 255),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                      6.0), // Bordas arredondadas
                                  side: BorderSide(
                                      color:
                                          const Color.fromARGB(255, 70, 68, 68),
                                      width:
                                          1.0), // Borda preta com largura de 2
                                ),
                                padding: EdgeInsets.symmetric(
                                    horizontal: 10, vertical: 5),
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text('Atividade moderada',
                                      style: TextStyle(
                                        fontSize: 14, // Tamanho do texto
                                        color: const Color.fromARGB(
                                            255, 10, 10, 10), // Cor do texto
                                        fontWeight:
                                            FontWeight.bold, // Negrito opcional
                                      )),
                                  if (_isSubtextVisible[2])
                                    Text(
                                      'Pouco tempo em pé. p. ex. home office/escritório',
                                      style: TextStyle(
                                          fontSize: 12,
                                          color: const Color.fromARGB(
                                              179, 5, 5, 5)),
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
                                    : Color.fromARGB(255, 255, 255, 255),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                      6.0), // Bordas arredondadas
                                  side: BorderSide(
                                      color:
                                          const Color.fromARGB(255, 70, 68, 68),
                                      width:
                                          1.0), // Borda preta com largura de 2
                                ),
                                padding: EdgeInsets.symmetric(
                                    horizontal: 10, vertical: 5),
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text('Atividade intensa',
                                      style: TextStyle(
                                        fontSize: 14, // Tamanho do texto
                                        color: const Color.fromARGB(
                                            255, 10, 10, 10), // Cor do texto
                                        fontWeight:
                                            FontWeight.bold, // Negrito opcional
                                      )),
                                  if (_isSubtextVisible[3])
                                    Text(
                                      'Pouco tempo em pé. p. ex. home office/escritório',
                                      style: TextStyle(
                                          fontSize: 12,
                                          color: const Color.fromARGB(
                                              179, 10, 10, 10)),
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
                          enviarDadosNutricionaisParaAPI(usuarioId);
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Color.fromARGB(
                              255, 248, 174, 63), // Cor de fundo laranja
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(
                                6.0), // Bordas arredondadas
                            side: BorderSide(
                                color: const Color.fromARGB(255, 87, 87, 87),
                                width: 2.0), // Borda preta com largura de 2
                          ),
                          padding: EdgeInsets.symmetric(
                              horizontal: 20, vertical: 15), // Tamanho do botão
                        ),
                        child: Text("Salvar alterações",
                            style: TextStyle(
                              fontSize: 16, // Tamanho do texto
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
    _alturaController.dispose();
    _peso_atualController.dispose();
    _peso_desejadoController.dispose();
    _alturaController.dispose();
    super.dispose();
  }

  void enviarDadosNutricionaisParaAPI(int? usuarioId) async {
    int? id = usuarioId!;
    String altura = _alturaController.text;
    String peso = _peso_atualController.text;
    String meta = _peso_desejadoController.text;
    String atividade = _atividade_opController.text;

    print(altura + " " + peso + " " + meta + " " + atividade);

    if (_formKey.currentState!.validate()) {
      await _nutricionaisService.cadastrarInfonutricionais(
        id: id,
        altura: altura,
        peso: peso,
        meta: meta,
        atividade: "Leve",
      );
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => Meta()),
      );
    } else {
      print("Formulário inválido");
    }
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
