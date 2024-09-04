import 'package:flutter/material.dart';
import 'package:vida_leve/telas/main_origem.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MainOrigem(),
    );
  }
}
