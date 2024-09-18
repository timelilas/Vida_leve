import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vida_leve/model/user.dart';
import 'package:vida_leve/servicos/api_service.dart';

class AutenticacaoServico {
  final ApiService _apiService = ApiService(baseUrl: 'http://localhost:3000');

  Future<int?> cadastrarUsuario({
    required String userName,
    required String email,
    required String senha,
    required BuildContext context,
  }) async {
    final endpoint = '/user/create';
    final body = {
      'userName': userName,
      'email': email,
      'senha': senha,
    };

    final response = await _apiService.postData(endpoint, body);

    if (response != null && response['id'] != null) {
      final usuarioId = int.tryParse(response['id'].toString());
      print('Usuário cadastrado com sucesso. ID: $usuarioId');
      return usuarioId; // Retorna o ID do usuário
    } else {
      print('Erro ao cadastrar usuário');
      return null; // Retorna null em caso de erro
    }
  }

  Future<int?> autenticarUsuario({
    required String email,
    required String senha,
    required BuildContext context,
  }) async {
    final endpoint = '/user/login';
    final body = {
      'email': email,
      'senha': senha,
    };

    final response = await _apiService.postData(endpoint, body);

    if (response != null && response['id'] != null) {
      final usuarioId = int.tryParse(response['id'].toString());
      if (usuarioId != null) {
        Provider.of<User>(context, listen: false).manterID(usuarioId);
        print('Usuário autenticado com sucesso: $usuarioId');
        return usuarioId; // Retorna o ID do usuário
      } else {
        print('Erro: ID inválido');
        return null; // Retorna null se a conversão falhar
      }
    } else {
      print('Erro ao autenticar usuário');
      return null; // Retorna null se a resposta for nula
    }
  }
}
