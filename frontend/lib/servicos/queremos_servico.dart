import 'package:flutter/material.dart';
import 'package:vida_leve/servicos/api_service.dart';

class QueremosServico {
  final ApiService _apiService = ApiService(baseUrl: 'http://localhost:3000');

  Future<void> cadastrarInfoQueremosConhecer({
    required int id,
    required String userName,
    required String telefone,
    required String aniversario,
    required String sexo,
    required BuildContext context,
  }) async {
    final endpoint = '/user/profile/$id';
    final body = {
      'apelido': userName,
      'telefone': telefone,
      'aniversario': aniversario,
      'sexo': sexo,
    };

    final response = await _apiService.postData(endpoint, body);
    if (response != null) {
      print(
          'Informacoes queremos te conhecer cadastradas com sucesso: $response');
    } else {
      print('Erro ao cadastrar queremos te conhecer');
    }
  }
}
