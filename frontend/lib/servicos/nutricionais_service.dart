import 'package:vida_leve/servicos/api_service.dart';

class NutricionaisService {
  final ApiService _apiService = ApiService(baseUrl: 'http://localhost:3000');

  Future<void> cadastrarInfonutricionais({
    required String altura,
    required String peso,
    required String meta,
    required String atividade,
  }) async {
    final endpoint = '/prgress/:id';
    final body = {
      'apelido': altura,
      'telefone': peso,
      'meta': meta,
      'atividade': atividade,
    };

    final response = await _apiService.postData(endpoint, body);
    if (response != null) {
      print('Informacoes cadastradas com sucesso: $response');
    } else {
      print('Erro ao cadastrar informacoes');
    }
  }
}