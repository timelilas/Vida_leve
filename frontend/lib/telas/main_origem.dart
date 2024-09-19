import 'package:flutter/material.dart';
import 'package:vida_leve/telas/autenticacao_tela.dart';

class MainOrigem extends StatefulWidget {
  const MainOrigem({super.key});

  @override
  State<MainOrigem> createState() => _MainOrigem();
}

class _MainOrigem extends State<MainOrigem> {
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
              child: Center(
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Image.asset(
                        "assets/logo.png",
                        height: 250,
                      ),
                      const Text(
                        "Transforme sua jornada de perda de peso com o Vida Leve!",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const SizedBox(
                        height: 180,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => Autenticacao(
                                      escolherTela: false,
                                    )),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color.fromARGB(
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
                        child: const Text(
                          "Começar agora",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Color.fromARGB(
                                255, 27, 27, 27), // Cor do texto do botão
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 22,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => Autenticacao(
                                      escolherTela: true,
                                    )),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color.fromARGB(
                              255, 255, 255, 255), // Cor de fundo laranja
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(
                                18.0), // Bordas arredondadas
                            side: BorderSide(
                                color: const Color.fromARGB(255, 35, 35, 35),
                                width: 1.0), // Borda preta com largura de 2
                          ),
                          padding: EdgeInsets.symmetric(
                              horizontal: 20, vertical: 15), // Tamanho do botão
                        ),
                        child: const Text(
                          "Já tenho uma conta",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: const Color.fromARGB(
                                255, 35, 35, 35), // Cor do texto do botão
                          ),
                        ),
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
