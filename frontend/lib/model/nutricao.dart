class Nutricao {
  String id;
  String altura;
  String peso_atual;
  String peso_desejado;
  String atividade_op;

  Nutricao(
      {required this.id,
      required this.altura,
      required this.peso_atual,
      required this.peso_desejado,
      required this.atividade_op});

  Nutricao.fromMap(Map<String, dynamic> map)
      : id = map["id"],
        altura = map["altura"],
        peso_atual = map["peso_atual"],
        peso_desejado = map["peso_desejado"],
        atividade_op = map["atividade_op"];

  Map<String, dynamic> toMap() {
    return {
      "id": id,
      "name": altura,
      "comoFazer": peso_atual,
      "urlImagem": peso_desejado,
      "urlImagem": atividade_op,
    };
  }
}
