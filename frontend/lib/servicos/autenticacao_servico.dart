import 'package:vida_leve/servicos/api_service.dart';

class AutenticacaoServico {
  final ApiService _apiService = ApiService(baseUrl: 'http://localhost:3000');

  Future<void> cadastrarUsuario({
    required String userName,
    required String email,
    required String senha,
  }) async {
    final endpoint = '/user/create';
    final body = {
      'userName': userName,
      'email': email,
      'senha': senha,
    };

    final response = await _apiService.postData(endpoint, body);
    if (response != null) {
      print('Usuário cadastrado com sucesso: $response');
    } else {
      print('Erro ao cadastrar usuário');
    }
  }

  Future<void> autenticarUsuario({
    required String email,
    required String senha,
  }) async {
    final endpoint = '/user/login';
    final body = {
      'email': email,
      'senha': senha,
    };

    final response = await _apiService.postData(endpoint, body);
    if (response != null) {
      print('Usuário autenticado com sucesso: $response');
    } else {
      print('Erro ao autenticar usuário');
    }
  }
}
