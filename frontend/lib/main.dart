import 'package:flutter/material.dart';
import 'package:vida_leve/telas/autenticacao_tela.dart';
// import 'package:vida_leve/telas/login.dart';
// import 'package:vida_leve/telas/main_origem.dart';
// import 'package:vida_leve/telas/perfil.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: VidaLeveHomePage(),
    );
  }
}