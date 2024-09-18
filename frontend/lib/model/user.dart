import 'package:flutter/material.dart';

class User with ChangeNotifier {
  int? id;

  int? get clienteId => id;

  void manterID(int userId) {
    id = userId;
    notifyListeners(); // Notifica todas as partes do app que usam esse dado
  }

  void limparManterID() {
    id = null;
    notifyListeners();
  }
}
