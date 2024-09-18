import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vida_leve/model/user.dart';
import 'package:vida_leve/telas/main_origem.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => User(),
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MainOrigem(),
    );
  }
}
