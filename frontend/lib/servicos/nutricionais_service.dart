import 'package:vida_leve/servicos/api_service.dart';

class NutricionaisService {
  final ApiService _apiService = ApiService(baseUrl: 'https://vida-leve.onrender.com');

  Future<void> cadastrarInfonutricionais({
    required int id,
    required String altura,
    required String peso,
    required String meta,
    required String atividade,
  }) async {
    final endpoint = '/progress/$id';
    final body = {
      'altura': altura,
      'peso': peso,
      'meta': meta,
      'atividade': atividade,
    };

    final response = await _apiService.postData(endpoint, body);
    if (response != null) {
      print('Informacoes nutricionais cadastradas com sucesso: $response');
    } else {
      print('Erro ao cadastrar informacoes nutricionais');
    }
  }
}
