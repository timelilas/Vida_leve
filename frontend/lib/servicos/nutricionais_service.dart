import 'package:flutter/material.dart';
import 'package:vida_leve/servicos/api_service.dart';

class NutricionaisService {
  final ApiService _apiService = ApiService(baseUrl: 'http://localhost:3000');

  Future<void> cadastrarInfonutricionais({
    required int id,
    required String altura,
    required String peso,
    required String meta,
    required String atividade,
    required BuildContext context,
  }) async {
    final endpoint = '/progress/$id';
    final body = {
      'altura': 1.99,
      'peso': 100,
      'meta': 70,
      'atividade': "leve",
    };

    final response = await _apiService.postData(endpoint, body);
    if (response != null) {
      print('Informacoes nutricionais cadastradas com sucesso: $response');
    } else {
      print('Erro ao cadastrar informacoes nutricionais');
    }
  }
}
