import 'package:flutter/material.dart';

InputDecoration getAutenticacaoDecoracao(String label) {
  return InputDecoration(
    hintText: label,
    fillColor: Colors.white,
    filled: true,
    contentPadding: const EdgeInsets.fromLTRB(16, 8, 8, 8),
    border: OutlineInputBorder(borderRadius: BorderRadius.circular(10.0)),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10.0),
      borderSide:
          const BorderSide(color: Color.fromARGB(255, 114, 118, 153), width: 2),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide:
          const BorderSide(color: Color.fromARGB(255, 114, 118, 153), width: 2),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide:
          const BorderSide(color: Color.fromARGB(255, 114, 118, 153), width: 2),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide:
          const BorderSide(color: Color.fromARGB(255, 114, 118, 153), width: 2),
    ),
  );
}
