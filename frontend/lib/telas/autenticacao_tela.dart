import 'package:flutter/material.dart';
import 'package:vida_leve/servicos/api_service.dart';

class Autenticacao extends StatefulWidget {
  @override
  _AutenticacaoState createState() => _AutenticacaoState();
}

class _AutenticacaoState extends State<Autenticacao> {
  ApiService apiService = ApiService();
  var data;

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    final result = await apiService.fetchData();
    setState(() {
      data = result;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: data != null
          ? Text('Dados: ${data.toString()}')
          : CircularProgressIndicator(),
    );
  }
}
