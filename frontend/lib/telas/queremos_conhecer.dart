import 'package:flutter/material.dart';
import 'package:vida_leve/componentes/decoracao_campo_autenticacao.dart';
import 'package:vida_leve/model/validar_senha.dart';
import 'package:vida_leve/telas/info_nutricionais.dart';

class QueremosConhecer extends StatefulWidget {
  const QueremosConhecer({super.key});

  @override
  State<QueremosConhecer> createState() => _AutenticacaoState();
}

class _AutenticacaoState extends State<QueremosConhecer> {
  bool queroEntrar = true;
  final _formkey = GlobalKey<FormState>();

  TextEditingController _apelidolController = TextEditingController();
  TextEditingController _telefoneController = TextEditingController();
  TextEditingController _dt_nascimentoController = TextEditingController();
  TextEditingController _generoController = TextEditingController();

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
                        decoration: getAutenticacaoDecoracao(""),
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
                          labelText: 'Selecione a data',
                          prefixIcon:
                              Icon(Icons.calendar_today), // Ícone de calendário
                          border: OutlineInputBorder(),
                        ),
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
                            _dt_nascimentoController =
                                pickedDate.toString() as TextEditingController;
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
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => InfoNutricionais()),
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
