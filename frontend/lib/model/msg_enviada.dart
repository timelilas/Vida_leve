class MensagemEnviada {
  String id;
  String tipomensagem;
  String dataenvio;

  MensagemEnviada(
      {required this.id, required this.tipomensagem, required this.dataenvio});

  MensagemEnviada.fromMap(Map<String, dynamic> map)
      : id = map["id"],
        tipomensagem = map["tipomensagem"],
        dataenvio = map["dataenvio"];

  Map<String, dynamic> toMap() {
    return {
      "id": id,
      "tipomensagem": tipomensagem,
      "dataenvio": dataenvio,
    };
  }
}
