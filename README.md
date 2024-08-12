# Projeto Java com MySQL e Docker

## Configuração e Definição da Conexão com o Banco de Dados em MySQL

### Extensão Database Client
***Está etapa é importante pois nela eu tenho os dados de conexão do meu banco de dados no MySQL***

1. **Baixar a Extensão:**
   - Instale a extensão Database Client no VSCode.

2. **Configurar Conexão:**
   - Preencha o nome do host, nome do usuário, porta e senha.
   - Deixe o campo "nome do database" em branco.
   - Salve e conecte.

3. **Verificação:**
   - Se a conexão for bem-sucedida, um ícone de banco de dados será exibido no lado esquerdo. Ao clicar, mostrará o servidor e a conexão.

4. **Criar Tabelas:**
   - Crie o nome do servidor e a tabela principal conforme necessário.

### Extensão Docker

1. **Instalar Extensão:**
   - Procure "Docker" no marketplace do VSCode e instale a extensão.

2. **Verificação de Imagens:**
   - Conecte-se e avalie as imagens criadas até o momento.

3. **Uso do Docker Desktop:**
   - A extensão pode ser utilizada juntamente com o Docker Desktop.
   - Link para baixar o Docker Desktop: [Docker Desktop](https://www.docker.com/).

### Criar Integração com o Banco no Terminal

1. **Criar Conexão com o Banco:**
   ```bash
   docker run --name meubancomysql -e MYSQL_ROOT_PASSWORD=123456 mysql

1.1 **Inserir -dp para rodar em segundo plano e não fechar o terminal**
   ```bash
   docker run --name meubancomysql -e MYSQL_ROOT_PASSWORD=123456 mysql -dp

***"meubancomysql" é o nome do container e "123456" é a senha. "mysql" será o nome da Imagem que ficará armazenada no Docker. A Imagem é diferente do nome que damos ao banco***

2. **Verificar Containers Ativos:**
   ```bash 
   docker ps

3. **Avaliação pelo Docker Desktop/VSCode:**
Use o Docker Desktop ou a extensão Docker no VSCode para visualizar containers.

4. **Iniciar Container:**
   ```bash
   docker start <ID>

***Substitua <ID> pelo ID do container (por exemplo, "c3").***

5. **Remover Container:**
   ```bash
   docker rm <ID>

   ```

# Foto aqui. Deixei as imagens no One Note pois eu preciso das evidências

## Inicio do Comentário pessoal

Para evitar conflitos de porta, é necessário mapear a porta do container MySQL para a porta da máquina local. Abaixo está o comando para iniciar o container MySQL mapeando a porta 3306 do container para a porta 3306 da máquina local:
   
   ```bash
   docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306
   ```

ou
   ```bash
   docker run --name nomequedesejo -e MYSQL_ROOT_PASSWORD=123456 -P
   
   ```

**Se eu inserir -P (Maisculo) o próprio Docker vai gerar a porta que tiver disponível. Com isso, consigo testar localmente na minha máquina**

No comando acima, a opção -p 3306:3306 mapeia a porta do container para a mesma porta na máquina local, garantindo que ambas estejam sincronizadas.

Para rodar o container em segundo plano e não bloquear o terminal, adicione a opção -d ao comando:

   ```bash
   docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql

   ```

Nota: Use o nome mysql para o container, pois este foi o nome atribuído ao baixar a imagem do Docker Hub.

Alternativamente, você pode usar o seguinte script para criar um container MySQL com um banco de dados e usuário específico:

   ```bash
   docker run --name banco-dados -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=servidor-java -e MYSQL_USER=meu-nome -e MYSQL_PASSWORD=123456 -p 3306:3306 -d mysql:8.0

   ```

Após executar esses comandos, você poderá visualizar o container em execução na extensão Docker do VSCode, com detalhes do banco de dados do lado direito.

Para utilizar a extensão Database Client, basta instalá-la e seguir as instruções de configuração para conectar ao seu banco de dados MySQL.

## Fim do comentário pessoal

# Criar servidor/tabela no MySQL manualmente

1. Voltar na extesão do Database Client
2. Clicar no + que possui ao clicar no servidor do MySQL
3. Vai ter o comando:

   ```bash
      CREATE DATABASE 
         DEFAULT CHARACTER SET = 'utf8mb4';

4. Inserir o nome que vou usar, neste caso coloquei o mesmo do professo: javamysqldb
5. Clicar em executar
6. Clique no servidor do lado esquerdo novamente, ao selecionar, clicar na opção Refresh para atualizar.
7. Consultar se foi criado o Database

# Criar a conexão usando comando

1. Abri consulta
 ```bash
   docker exec -it bancodados  mysql -u root -p

2. Criar a tabela
   ```bash
   CREATE TABLE nome
      DEFAULT CHARACTER SET = 'utf8mb4';

   ```

# Testar Conexão com MySQL

1. **Iniciar Container MySQL:**
   ```bash
   docker exec -it nomebanco nomedaimagem -u root -p

***Eu estou usando bancodados e Imagem com mysql***

1.1 Digite a senha definida para o banco.

2. **Selecionar o database que iremos utilizar**
   ```bash
   USE nome-do-servidor/banco


***Serve para eu chamar a tabela/servidor que vou inserir dados. Preciso me atentar no nome que dei no processo lá em cima, no momento da criação.***

3. **Criar Banco de Dados e Tabelas:**

   ```bash
      CREATE TABLE users (
         id int NOT NULL,
         first_name varchar(255) NOT NULL,
         last_name varchar(255),
         email varchar(255),
         gender varchar(255)
      );

3. **Inserir Dados:**

   ```bash
      INSERT INTO users (id, first_name, last_name, gender, email) VALUES (1, 'Teste', 'Teste', 'male', 'teste@gmail.com');

4. **Consultar Dados:**
   ```bash
   SELECT * FROM users;

## Configuração e Definição da Conexão com o BackEnd

# Compilar e Rodar o Projeto Java

1. **Configurar Java 17:**
   ```bash
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)

1.1 **Verificar versão do Java e saber se está correta**

java -version

2. **Limpar e Buildar Projeto:**
   
   ```bash
      mvn clean

2.2 mvn -Dmaven.test.skip=true package

3. **Executar Aplicação:**
   ```bash
   mvn spring-boot:run

# Configuração do BackEnd

1. **Definir Variáveis de Ambiente:**
Configure SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD.

2. **Dockerfile para BackEnd:**
Crie um Dockerfile para definir a imagem do Docker.

***Exemplo do documento***

```
# Use a imagem base do OpenJDK 17
FROM openjdk:17-jdk-slim

# Cria um diretório de trabalho
WORKDIR /app

# Copia o arquivo JAR para o contêiner
COPY target/javamysql-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que a aplicação está usando. Para ficar mais simples, é a porta que vamos utilizar no postman, no navegador, Swagger, entre outros.
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]

```

3. **Criar Imagem Docker:**
   ```bash
   docker build -t back-end .

4. **Executar Container do BackEnd:**
   ```bash
   docker run --name backend --network my_network -p 8080:8080 back-end

5. **Verificar JAR Gerado:**
   ```bash
   ls target

## Configuração e Definição da Conexão com o FrontEnd

# Configuração do FrontEnd

***Vamos criar o front para testar a aplicação funcionando. Foi o último pedido no documento que nosso professor enviou. Neste caso, vamos criar um formulário simples, que faça os inputs no banco de dados.***

1. **Dockerfile para FrontEnd:**

Crie um Dockerfile para o projeto frontend:

**dockerfile**

***Copiar código e colar no documento Dockerfile:***

```
# Use a imagem base do Node.js, da mesma forma que fariamos se fossemos baixar uma nova versão
FROM node:latest

# Criar uma nova pasta de trabalho
WORKDIR /app

# Copiar o arquivo package.json para o contêiner
COPY package*.json ./

# Rodar a aplicação
RUN npm install

# Copiar tudo da aplicação
COPY . .

# Definir a porta que iremos trabalhar no front
EXPOSE 3000

# Rodar a aplicação
CMD [ "npm", "start" ]

```

2. **Criar Imagem Docker do FrontEnd:**
   ```bash
      docker build -t front-end .

3. **Executar Container do FrontEnd:**
   ```bash
      docker run --name react-app -p 3000:3000 front-end


## Juntar Tudo com Docker Network

1. **Criar Network:**
   ```bash
   docker network create my_network

2. **Conectar Containers à Network:**
   ```bash
   docker network connect my_network mysql

3. **Rodar Container do BackEnd na Network:**
   ```bash
   docker run --name backend --network my_network -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/javamysqldb -e SPRING_DATASOURCE_USERNAME=myuser -e SPRING_DATASOURCE_PASSWORD=123456 back-end

## Testar Aplicação

1. **Verificar Funcionamento:**

1.1 Use o Postman ou navegador para testar a API e o banco de dados.

2. **Confirmar Configurações:**
Verifique se os dados no application.properties estão corretos.

3. **Verificar Banco de Dados:**
   ```bash
   SHOW DATABASES;

4. Se mostrar a tabela, significa que deu certo o processo.


