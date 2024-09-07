import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_multi_formatter/formatters/masked_input_formatter.dart';
import 'package:intl/intl.dart';
import 'package:vida_leve/componentes/decoracao_campo_autenticacao.dart';
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
  DateTime? _selectedDate;

  final _formKey = GlobalKey<FormState>();

  // Validação para garantir que o campo não tenha letras
  String? validarTelefone(String? value) {
    if (value == null || value.isEmpty) {
      return 'O telefone é obrigatório';
    }

// Remover espaços e caracteres não numéricos
    final phoneDigits = value.replaceAll(RegExp(r'\D'), '');

    if (phoneDigits.length != 11) {
      return 'O telefone deve ter 11 dígitos';
    }

    // Verifica se contém alguma letra
    final regexLetras = RegExp(r'[A-Za-z]');
    if (regexLetras.hasMatch(value)) {
      return 'O telefone não pode conter letras';
    }

    return null;
  }

  // Navegar para a tela de Mais Informações com o telefone
  void _salvarTelefone() {
    if (_formKey.currentState!.validate()) {
      String telefone = _telefoneController.text;
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => InfoNutricionais(),
        ),
      );
    }
  }

  // Função para exibir o seletor de data
  Future<void> _selectDate(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (pickedDate != null && pickedDate != _selectedDate) {
      setState(() {
        _selectedDate = pickedDate;
        // Formata a data para exibição no campo de texto
        _dt_nascimentoController.text =
            DateFormat('dd/MM/yyyy').format(pickedDate);
      });
    }
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
                        "Queremos ter conhecer melhor",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 25,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const Text(
                        "Complete seu cadastro para tornarmos sua experiência mais personalizada",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const SizedBox(
                        height: 32,
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
                        height: 32,
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
                        height: 32,
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
                        readOnly:
                            true, // Evita que o usuário digite manualmente
                        onTap: () async {
                          // Esconde o teclado ao tocar no TextField
                          FocusScope.of(context).requestFocus(FocusNode());

                          // Exibe o seletor de data
                          DateTime? pickedDate = await showDatePicker(
                            context: context,
                            initialDate: DateTime.now(),
                            firstDate: DateTime(2000),
                            lastDate: DateTime(2100),
                          );

                          if (pickedDate != null) {
                            // Faz algo com a data selecionada
                            String formattedDate =
                                DateFormat('dd/MM/yyyy').format(pickedDate);
                            // Atualiza o campo de texto com a data formatada
                            setState(() {
                              _dt_nascimentoController.text = formattedDate;
                            });
                          }
                        },
                      ),
                      const SizedBox(
                        height: 32,
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
                        children: <Widget>[
                          ElevatedButton(
                            onPressed: () {
                              // Ação ao pressionar o botão "Masculino"
                              print("Masculino selecionado");
                            },
                            child: Text('Masculino'),
                          ),
                          SizedBox(width: 20), // Espaçamento entre os botões
                          ElevatedButton(
                            onPressed: () {
                              // Ação ao pressionar o botão "Feminino"
                              print("Feminino selecionado");
                            },
                            child: Text('Feminino'),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 32,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          if (_selectedDate != null) {
                            // Exibe a data selecionada em um Snackbar
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                  content: Text(
                                      'Data Selecionada: ${_dt_nascimentoController.text}')),
                            );
                          }
                        },
                        child: Text('Salvar Data'),
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
    super.dispose();
  }
}
