import 'package:firebase_auth/firebase_auth.dart';

final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;

class AutenticacaoServico {
  cadastrarUsuario({
    required String nome,
    required String senha,
    required String email,
  }) {
    _firebaseAuth.createUserWithEmailAndPassword(
      email: email,
      password: senha,
    );
  }
}
