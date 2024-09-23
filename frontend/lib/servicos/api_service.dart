import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  final String baseUrl;

  ApiService({this.baseUrl = 'https://vida-leve.onrender.com'});

  Future<dynamic> getData(String endpoint) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.get(url);
      return _processResponse(response);
    } catch (e) {
      print('Erro: $e');
      return null;
    }
  }

  Future<dynamic> postData(String endpoint, Map<String, dynamic> body) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.post(url, body: jsonEncode(body), headers: {
        'Content-Type': 'application/json',
      });
      return _processResponse(response);
    } catch (e) {
      print('Erro: $e');
      return null;
    }
  }

  Future<dynamic> putData(String endpoint, Map<String, dynamic> body) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.put(url, body: jsonEncode(body), headers: {
        'Content-Type': 'application/json',
      });
      return _processResponse(response);
    } catch (e) {
      print('Erro: $e');
      return null;
    }
  }

  Future<dynamic> deleteData(String endpoint) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.delete(url);
      return _processResponse(response);
    } catch (e) {
      print('Erro: $e');
      return null;
    }
  }

  dynamic _processResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return jsonDecode(response.body);
    } else {
      print('Falha na requisição: ${response.statusCode}');
      return null;
    }
  }
}
