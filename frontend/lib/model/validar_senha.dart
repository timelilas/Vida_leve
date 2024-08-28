class PasswordValidator {
  static bool isValid(String password) {
    if (password.length < 8) return false;

    int criteriaCount = 0;

    if (RegExp(r'[a-z]').hasMatch(password)) criteriaCount++;
    if (RegExp(r'[A-Z]').hasMatch(password)) criteriaCount++;
    if (RegExp(r'[0-9]').hasMatch(password)) criteriaCount++;
    if (RegExp(r'[!@#$%&*]').hasMatch(password)) criteriaCount++;

    return criteriaCount >= 3;
  }
}