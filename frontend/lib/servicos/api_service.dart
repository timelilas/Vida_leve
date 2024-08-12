import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  Future<dynamic> fetchData() async {
    final url = Uri.parse('http://localhost:3000');
    try {
      final response = await http.get(url);
      print('Status code: ${response}');
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        print('Falha na requisição: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      print('Erro: $e');
      return null;
    }
  }
}
