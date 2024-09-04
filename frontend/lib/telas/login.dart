import 'package:flutter/material.dart';
import 'package:vida_leve/_comum/fonts.dart';
import 'package:vida_leve/model/login_page.dart';
import 'package:vida_leve/model/msg_enviada.dart';

class Login extends StatefulWidget {
  Login({super.key});

  @override
  State<Login> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<Login> {
  final LoginPage loginPage = LoginPage(
      id: "465465",
      name: "Salada não é comida",
      comoFazer: "Salada não é comida");

  final List<MensagemEnviada> ListaMensagemEnviada = [
    MensagemEnviada(
        id: "123456", tipomensagem: "Prato feito", dataenvio: "2022/10/1966"),
    MensagemEnviada(
        id: "123456", tipomensagem: "Coxinha crua", dataenvio: "2022/10/1966"),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 99, 134, 143),
      appBar: AppBar(
        title: Column(
          children: [
            Text(
              "${loginPage.id}",
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 35),
            ),
            Text("${loginPage.name}",
                style:
                    const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
          ],
        ),
        centerTitle: true,
        backgroundColor: CoresApp.azulEscuro,
        elevation: 0,
        toolbarHeight: 80,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(
            bottom: Radius.circular(35),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          print("Foi clicado!!!");
        },
        child: const Icon(Icons.add),
      ),
      body: Container(
        margin: const EdgeInsets.all(10),
        padding: const EdgeInsets.all(16.0),
        decoration: BoxDecoration(
            color: Colors.white, borderRadius: BorderRadius.circular(16)),
        child: ListView(
          children: [
            SizedBox(
              height: 250,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  ElevatedButton(
                    onPressed: () {},
                    child: Text("Enviar foto perfil"),
                    style: ElevatedButton.styleFrom(
                      shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.zero),
                    ),
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    child: Text("Tirar foto"),
                    style: ElevatedButton.styleFrom(
                      shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.zero),
                    ),
                  )
                ],
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              "Como fazer ?",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            Text(
              loginPage.comoFazer,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 10),
            ),
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Divider(color: Colors.black),
            ),
            const SizedBox(height: 8),
            Text(
              "${loginPage.comoFazer}Aqui!",
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            Text(
              "${loginPage.comoFazer}Só comida ruim",
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 10),
            ),
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Divider(color: Colors.black),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: List.generate(ListaMensagemEnviada.length, (index) {
                MensagemEnviada msm = ListaMensagemEnviada[index];
                return ListTile(
                  dense: true,
                  contentPadding: EdgeInsets.zero,
                  title: Text(msm.tipomensagem),
                  subtitle: Text(msm.dataenvio),
                  leading: const Icon(Icons.double_arrow_rounded),
                  trailing: IconButton(
                    icon: const Icon(
                      Icons.delete,
                      color: Colors.red,
                    ),
                    onPressed: () {
                      print("Teste");
                    },
                  ),
                );
              }),
            )
          ],
        ),
      ),
    );
  }
}
