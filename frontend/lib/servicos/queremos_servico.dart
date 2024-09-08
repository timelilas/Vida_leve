import 'package:vida_leve/servicos/api_service.dart';

class QueremosServico {
  final ApiService _apiService = ApiService(baseUrl: 'http://localhost:3000');

  Future<void> cadastrarInfoQueremosConhecer({
    required String apelido,
    required String telefone,
    required String aniversario,
    required String sexo,
  }) async {
    final endpoint = '/prgress/:id';
    final body = {
      'apelido': apelido,
      'telefone': telefone,
      'aniversario': aniversario,
      'sexo': sexo,
    };

    final response = await _apiService.postData(endpoint, body);
    if (response != null) {
      print('Informacoes cadastradas com sucesso: $response');
    } else {
      print('Erro ao cadastrar informacoes');
    }
  }
}
