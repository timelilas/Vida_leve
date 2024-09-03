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
                SizedBox(height: 50),
                Text(
                  "Resume",
                  style: TextStyle(
                    color: Color.fromARGB(255, 70, 132, 77),
                  ),
                ),
                Card(
                  elevation: 4,
                  child: ,,
                ),

              ],
            ),
          ),
        ],
      ),
    );
  }
}
