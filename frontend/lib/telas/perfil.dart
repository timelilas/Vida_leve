import 'package:flutter/material.dart';

class PerfilUser extends StatefulWidget {
  const PerfilUser({super.key});

  @override
  State<PerfilUser> createState() => _MainOrigem();
}

class _MainOrigem extends State<PerfilUser> {
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
                        "assets/manutencao.png",
                        height: 200,
                      ),
                      const Text(
                        "Informações do perfil ficaram disponiveis aqui em breve",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF4E4B66),
                        ),
                      ),
                      const SizedBox(
                        height: 182,
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
