class LoginPage {
  String id;
  String name;
  String comoFazer;
  String? urlImagem;

  LoginPage({required this.id, required this.name, required this.comoFazer});

  LoginPage.fromMap(Map<String, dynamic> map)
      : id = map["id"],
        name = map["name"],
        comoFazer = map["comoFazer"],
        urlImagem = map["urlImagem"];

  Map<String, dynamic> toMap() {
    return {
      "id": id,
      "name": name,
      "comoFazer": comoFazer,
      "urlImagem": urlImagem
    };
  }
}
