# Usar a imagem base do Dart
FROM dart:stable AS build

# Configurar o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instalar dependências necessárias
RUN apt-get update && apt-get install -y \
  curl \
  git \
  unzip

# Baixar e instalar o Flutter
RUN git clone https://github.com/flutter/flutter.git /flutter
ENV PATH="/flutter/bin:${PATH}"

# Copiar o código do projeto para o contêiner
COPY . /app

# Instalar as dependências do Flutter
RUN flutter doctor
RUN flutter pub get

# Expor a porta padrão para Flutter Web (caso esteja utilizando Flutter Web)
EXPOSE 8080

# Comando para rodar a aplicação Flutter (substitua de acordo com sua necessidade)
CMD ["flutter", "run", "-d", "web-server", "--web-port", "8080", "--web-hostname", "0.0.0.0"]
