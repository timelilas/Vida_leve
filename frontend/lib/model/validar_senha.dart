class PasswordValidator {
  static String? validate(String password) {
    List<String> errors = [];

    // Verifica se a senha tem pelo menos 8 caracteres
    if (password.length < 6) {
      errors.add('A senha deve ter pelo menos 7 caracteres.');
    }

    // Verifica se a senha contém pelo menos uma letra minúscula
    if (!RegExp(r'[a-z]').hasMatch(password)) {
      errors.add('A senha deve conter pelo menos uma letra minúscula.');
    }

    // Verifica se a senha contém pelo menos uma letra maiúscula
    if (!RegExp(r'[A-Z]').hasMatch(password)) {
      errors.add('A senha deve conter pelo menos uma letra maiúscula.');
    }

    // Verifica se a senha contém pelo menos um número
    if (!RegExp(r'[0-9]').hasMatch(password)) {
      errors.add('A senha deve conter pelo menos um número.');
    }

    // Verifica se a senha contém pelo menos um caractere especial
    if (!RegExp(r'[!@#$%&*]').hasMatch(password)) {
      errors.add('A senha deve conter pelo menos um caractere especial (!@#\$%&*).');
    }

    // Retorna todas as mensagens de erro concatenadas, ou null se não houver erros
    if (errors.isNotEmpty) {
      return errors.join('\n');
    }
    return null;
  }
}
