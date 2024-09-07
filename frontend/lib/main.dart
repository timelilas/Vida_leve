import 'package:flutter/material.dart';
import 'package:vida_leve/telas/autenticacao_tela.dart';
import 'package:vida_leve/telas/info_nutricionais.dart';
import 'package:vida_leve/telas/main_origem.dart';
import 'package:vida_leve/telas/queremos_conhecer.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: QueremosConhecer(),
    );
  }
}
