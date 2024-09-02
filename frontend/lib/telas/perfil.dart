import 'package:flutter/material.dart';

class PerfilTela extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFEFF0F6),
      body: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Logo no topo
                Center(
                  child: Image.asset(
                    'assets/logoperfil.png', // Substitua pelo caminho do seu logo
                    width: 100,
                    height: 100,
                  ),
                ),
                SizedBox(height: 20), // Espaço entre o logo e o primeiro card
                // Card com nome e ícone de edição
                Card(
                  elevation: 4,
                  color: const Color.fromARGB(255, 255, 255, 255),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Olá, Aryela ! ",
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.bold)),
                        SizedBox(height: 15), // E
                        Text("aryela.scostaux@gmail.com",
                            style: TextStyle(
                                fontSize: 12, fontWeight: FontWeight.bold))
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 30),
                Text(
                  "Resume",
                  style: TextStyle(
                    color: Color.fromARGB(255, 70, 132, 77),
                  ),
                ),
                Card(
                  elevation: 4,
                  color: const Color.fromARGB(255, 255, 255, 255),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        // Primeiro sub-card contendo dois textos
                        Expanded(
                          child: Card(
                            elevation: 2,
                            color: const Color.fromARGB(255, 255, 255, 255),
                            child: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    '0',
                                    style: TextStyle(
                                      fontSize: 54,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  SizedBox(height: 8), // Espaço entre os textos
                                  Text(
                                    'Consumidas',
                                    style: TextStyle(
                                      fontSize: 18,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        // Espaço entre os sub-cards
                        // Segundo sub-card com barra de progresso circular parcial e texto
                        Expanded(
                          child: Card(
                            elevation: 2,
                            color: const Color.fromARGB(255, 255, 255, 255),
                            child: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    '1470',
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  SizedBox(
                                      height:
                                          8), // Espaço entre o texto e a barra
                                  CustomPaint(
                                    size: Size(100, 100),
                                  ),
                                  SizedBox(
                                      height:
                                          8), // Espaço entre a barra e o texto
                                  Text(
                                    'Restantes',
                                    style: TextStyle(
                                      fontSize: 28,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 30),
                Text(
                  "Alimentação",
                  style: TextStyle(
                    color: Color.fromARGB(255, 70, 132, 77),
                  ),
                ),
                Card(
                  elevation: 4,
                  color: const Color.fromARGB(255, 255, 255, 255),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // E
                        Text("Café da Manhã",
                            style: TextStyle(
                                fontSize: 12, fontWeight: FontWeight.bold)),
                        Text("Almoço",
                            style: TextStyle(
                                fontSize: 12, fontWeight: FontWeight.bold)),
                        Text("Jantar",
                            style: TextStyle(
                                fontSize: 12, fontWeight: FontWeight.bold)),
                        Text("Lanches",
                            style: TextStyle(
                                fontSize: 12, fontWeight: FontWeight.bold)),
                        Text("Lanches",
                            style: TextStyle(
                                fontSize: 12, fontWeight: FontWeight.bold)),
                        Text("Lanches",
                            style: TextStyle(
                                fontSize: 12, fontWeight: FontWeight.bold)),
                        Text("Lanches",
                            style: TextStyle(
                                fontSize: 12, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
