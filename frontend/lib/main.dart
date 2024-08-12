import 'package:flutter/material.dart';
import 'package:vida_leve/telas/autenticacao_tela.dart';
import 'package:vida_leve/servicos/api_service.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Autenticacao(), // Tela principal
    );
  }
}
