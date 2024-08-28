import 'package:flutter/material.dart';

void main() {
  runApp(VidaLeveApp());
}

class VidaLeveApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: VidaLeveHomePage(),
    );
  }
}

class VidaLeveHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Vida Leve'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Card principal que contém os dois sub-cards
            Card(
              elevation: 4,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Primeiro sub-card contendo dois textos
                    Expanded(
                      child: Card(
                        elevation: 2,
                        color: Colors.blue[100],
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                '0',
                                style: TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 8), // Espaço entre os textos
                              Text(
                                'Consumidas',
                                style: TextStyle(
                                  fontSize: 18,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    SizedBox(width: 16), // Espaço entre os sub-cards
                    // Segundo sub-card com barra de progresso circular parcial e texto
                    Expanded(
                      child: Card(
                        elevation: 2,
                        color: Colors.green[100],
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                '1470',
                                style: TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(
                                  height: 8), // Espaço entre o texto e a barra
                              CustomPaint(
                                size: Size(100, 100),
                                painter: CircularProgressPainter(
                                    0.7), // 70% do círculo
                              ),
                              SizedBox(
                                  height: 8), // Espaço entre a barra e o texto
                              Text(
                                'Restantes',
                                style: TextStyle(
                                  fontSize: 18,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// CustomPainter para criar uma barra de progresso circular parcial
class CircularProgressPainter extends CustomPainter {
  final double progress;

  CircularProgressPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    Paint circle = Paint()
      ..strokeWidth = 8
      ..color = Colors.grey[300]!
      ..style = PaintingStyle.stroke;

    Paint progressArc = Paint()
      ..strokeWidth = 8
      ..color = Colors.green
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    Offset center = Offset(size.width / 2, size.height / 2);
    double radius = size.width / 2 - 8;

    // Desenha o círculo de fundo
    canvas.drawCircle(center, radius, circle);

    // Desenha o arco de progresso
    double angle = 2 * 3.14 * progress;
    canvas.drawArc(Rect.fromCircle(center: center, radius: radius), -3.14 / 2,
        angle, false, progressArc);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}