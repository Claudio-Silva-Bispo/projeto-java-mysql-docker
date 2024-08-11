# Use a imagem base do OpenJDK 17
FROM openjdk:17-jdk-slim

# Cria um diretório de trabalho
WORKDIR /app

# Copia o arquivo JAR para o contêiner
COPY target/javamysql-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que a aplicação está usando
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
