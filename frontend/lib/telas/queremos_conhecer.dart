import 'package:flutter/material.dart';
import 'package:flutter_multi_formatter/formatters/masked_input_formatter.dart';
import 'package:intl/intl.dart';
import 'package:vida_leve/componentes/decoracao_campo_autenticacao.dart';
import 'package:vida_leve/servicos/queremos_servico.dart';
import 'package:vida_leve/telas/info_nutricionais.dart';

class QueremosConhecer extends StatefulWidget {
  const QueremosConhecer({super.key});

  @override
  State<QueremosConhecer> createState() => _AutenticacaoState();
}

class _AutenticacaoState extends State<QueremosConhecer> {
  bool queroEntrar = true;
  TextEditingController _apelidolController = TextEditingController();
  TextEditingController _telefoneController = TextEditingController();
  TextEditingController _dt_nascimentoController = TextEditingController();
  TextEditingController _generoController = TextEditingController();
  String? selectedGender = '';
  DateTime? _selectedDate;

  QueremosServico _queremosServico = QueremosServico();

  final _formKey = GlobalKey<FormState>();

  String? validarTelefone(String? value) {
    if (value == null || value.isEmpty) {
      return 'O telefone é obrigatório';
    }

    final phoneDigits = value.replaceAll(RegExp(r'\D'), '');

    if (phoneDigits.length != 11) {
      return 'O telefone deve ter 11 dígitos';
    }

    final regexLetras = RegExp(r'[A-Za-z]');
    if (regexLetras.hasMatch(value)) {
      return 'O telefone não pode conter letras';
    }

    return null;
  }

  // Função para exibir o seletor de data

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
                        height: 100,
                      ),
                      const Text(
                        "Queremos ter conhecer melhor",
                        textAlign: TextAlign.start,
                        style: TextStyle(
                          fontSize: 25,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const Text(
                        "Complete seu cadastro para tornarmos sua experiência mais personalizada",
                        textAlign: TextAlign.start,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                      const Text(
                        "Como você gostaria de ser chamado (a)?",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      TextFormField(
                        controller: _apelidolController,
                        maxLength: 40,
                        decoration: getAutenticacaoDecoracao(""),
                        validator: (String? value) {
                          if (value == null) {
                            return "O nome não pode ser vazio.";
                          }
                          if (value.length < 1 || value.length > 10) {
                            return "Nome deve conter ate 10";
                          }
                          return null;
                        },
                      ),
                      const SizedBox(
                        height: 1,
                      ),
                      const Text(
                        "Telefone",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      TextFormField(
                        controller: _telefoneController,
                        decoration: InputDecoration(
                          hintText: '(XX) XXXXX-XXXX',
                          fillColor: Colors.white,
                          filled: true,
                          contentPadding:
                              const EdgeInsets.fromLTRB(16, 8, 8, 8),
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(4.0)),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(9.0),
                            borderSide: const BorderSide(
                                color: Color.fromARGB(255, 114, 118, 153),
                                width: 2),
                          ),
                        ),
                        keyboardType: TextInputType.phone,
                        inputFormatters: [
                          MaskedInputFormatter('(##) #####-####'),
                        ],
                        validator: validarTelefone,
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      const Text(
                        "Data de nascimento",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      TextFormField(
                        controller: _dt_nascimentoController,
                        decoration: InputDecoration(
                          labelText: 'Selecione a Data',
                          hintText: 'Clique para selecionar uma data',
                          suffixIcon: Icon(Icons.calendar_today),
                          fillColor: Colors.white,
                          filled: true,
                          contentPadding:
                              const EdgeInsets.fromLTRB(16, 8, 8, 8),
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(4.0)),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(9.0),
                            borderSide: const BorderSide(
                                color: Color.fromARGB(255, 114, 118, 153),
                                width: 2),
                          ),
                        ),
                        readOnly: true,
                        onTap: () async {
                          FocusScope.of(context).requestFocus(FocusNode());
                          DateTime? pickedDate = await showDatePicker(
                            context: context,
                            initialDate: DateTime.now(),
                            firstDate: DateTime(2000),
                            lastDate: DateTime(2100),
                          );

                          if (pickedDate != null) {
                            String formattedDate =
                                DateFormat('dd/MM/yyyy').format(pickedDate);
                            setState(() {
                              _dt_nascimentoController.text = formattedDate;
                            });
                          }
                        },
                      ),
                      const SizedBox(
                        height: 12,
                      ),
                      const Text(
                        "Gênero de nascimento",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          // Botão "Feminino"
                          GestureDetector(
                            onTap: () {
                              setState(() {
                                selectedGender = 'F';
                              });
                            },
                            child: Container(
                              width: 82, // Largura fixa de 82px
                              height: 48, // Altura fixa de 48px
                              padding: const EdgeInsets.only(
                                  top: 8), // Padding superior de 8px
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(
                                    12), // Border radius de 12px
                                border: Border.all(width: 1), // Border de 1px
                                color: selectedGender == 'F'
                                    ? Colors
                                        .orange // Se selecionado, cor laranja
                                    : const Color.fromARGB(255, 255, 254,
                                        254), // Se não, cor cinza
                              ),
                              child: Center(
                                child: Text(
                                  'Feminino',
                                  style: TextStyle(
                                    color: const Color.fromARGB(
                                        255, 10, 10, 10), // Cor do texto branca
                                  ),
                                ),
                              ),
                            ),
                          ),
                          SizedBox(width: 16), // Espaço entre os botões

                          // Botão "Masculino"
                          GestureDetector(
                            onTap: () {
                              setState(() {
                                selectedGender = 'M';
                              });
                            },
                            child: Container(
                              width: 82, // Largura fixa de 82px
                              height: 48, // Altura fixa de 48px
                              padding: const EdgeInsets.only(
                                  top: 8), // Padding superior de 8px
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(
                                    12), // Border radius de 12px
                                border: Border.all(width: 1), // Border de 1px
                                color: selectedGender == 'M'
                                    ? Colors
                                        .orange // Se selecionado, cor laranja
                                    : const Color.fromARGB(255, 252, 251,
                                        251), // Se não, cor cinza
                              ),
                              child: Center(
                                child: Text(
                                  'Homem',
                                  style: TextStyle(
                                    color: const Color.fromARGB(
                                        255, 5, 5, 5), // Cor do texto branca
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 100,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          if (_selectedDate != null) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                  content: Text(
                                      'link tela login: ${_dt_nascimentoController.text}')),
                            );
                          }
                          enviarDadosValidadosParaAPI();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              Colors.orange, // Cor de fundo laranja
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
    _dt_nascimentoController.dispose();
    _apelidolController.dispose();
    _telefoneController.dispose();
    _generoController.dispose();
    super.dispose();
  }

  void enviarDadosValidadosParaAPI() async {
    String userName = _apelidolController.text;
    String telefone = _telefoneController.text;
    String aniversario = _dt_nascimentoController.text;
    String sexo = _generoController.text;

    await _queremosServico.cadastrarInfoQueremosConhecer(
        id: 1,
        userName: userName,
        telefone: telefone,
        aniversario: aniversario,
        sexo: sexo);
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => InfoNutricionais()),
    );
  }
}
