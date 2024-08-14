# Projeto Java com MySQL e Docker

## Etapas que iremos executar neste projeto
1. Criar um projeto Java
2. Criar um projeto com banco de dados MYSQL
3. Criar um projeto com frontend para fazer inputs no banco
4. Utilizar o Docker Desktop, Extensão do MYSQL no VsCode, Utilizar Extensão do Docker no VsCode
5. Realizar os processos no terminal e nas ferramentas
6. Criar uma imagem do MySQL
7. Criar um container do MySQL
8. Conectar ao container do MySQL
9. Criar uma tabela no container do MySQL
10. Inserir dados na tabela do MySQL
11. Consultar os dados da tabela do MySQL
12. Atualizar os dados da tabela do MySQL
13. Deletar os dados da tabela do MySQL
14. Deletar o container do MySQL
15. Criar uma imagem do BackEnd
16. Criar um container do BackEnd
17. Conectar ao container do BackEnd
18. Criar uma imagem do FrontEnd
19. Criar um container do FrontEnd
20. Conectar ao container do FrontEnd

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

## Docker Desktop

1. Instalar o Docker Desktop
2. Acessar o site: https://www.docker.com/get-started/
3. Baixar o Docker Desktop
4. Instalar o Docker Desktop
5. Verificar se o Docker está funcionando corretamente.
   5.1 Abrir o terminal na máquina. 
   5.2 Digitar o domando docker ps
   5.3 Ele precisa mostrar uma tabela neste modelo:
   **CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES**

### Criar Integração com o Banco no Terminal

1. **Criar Conexão com o Banco pararando/bloqueando o terminar:**
```bash
   docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 mysql:latest
```

1.1 **Inserir -dp para rodar em segundo plano e não fechar o terminal**
```bash
   docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d -p 3306:3306 mysql:latest
```
***Atenção: neste modelo, não estamos definindo as portas. Tenho um processo abaixo completo e com definição das portas que iremos utilizar no projeto final***

1.2 **Criar o Container em uma Network que será usada em grupo com Back e Banco por exemplo**

```bash
   docker network create my_network
```

```bash
   docker run --name mysql --network my_network -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql:latest
```
**Esse processo será explicado melhor no final do documento. Se não quiser seguir com a network, só tirar essa parte do script e rodar o projeto de forma isolada**

***"meubancomysql" é o nome do container e "123456" é a senha. "mysql" será o nome da Imagem que ficará armazenada no Docker. A Imagem é diferente do nome que damos ao banco e no final, a versão do myq por exemplo "msql:lastest" que será baixada a última versão.***

2. **Verificar Containers Ativos:**
```bash 
   docker ps
```

3. **Avaliação pelo Docker Desktop/VSCode:**
Use o Docker Desktop ou a extensão Docker no VSCode para visualizar containers.

4. **Iniciar Container:**
```bash
   docker start <ID>
```

4.1 **Parar Container**
```bash
   docker stop <ID>
```

***Substitua <ID> pelo ID do container (por exemplo, "c3").***

5. **Remover Container:**
```bash
   docker rm <ID>
```

# Foto aqui. Deixei as imagens no One Note pois eu preciso das evidências

## Inicio do Comentário pessoal

Para evitar conflitos de porta, é necessário mapear a porta do container MySQL para a porta da máquina local. Abaixo está o comando para iniciar o container MySQL mapeando a porta 3306 do container para a porta 3306 da máquina local:
   
```bash
   docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql:latest
```

ou
```bash
   docker run --name nomequedesejo -e MYSQL_ROOT_PASSWORD=123456 -P
```

**Se eu inserir -P (Maisculo) o próprio Docker vai gerar a porta que tiver disponível. Com isso, consigo testar localmente na minha máquina**

No comando acima, a opção -p 3306:3306 mapeia a porta do container para a mesma porta na máquina local, garantindo que ambas estejam sincronizadas.

Para rodar o container em segundo plano e não bloquear o terminal, adicione a opção -d ao comando:

```bash
   docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql:latest
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
   CREATE DATABASE DEFAULT CHARACTER SET = 'utf8mb4';
```

4. Inserir o nome que vou usar, neste caso coloquei o mesmo do professo: javamysqldb
5. Clicar em executar
6. Clique no servidor do lado esquerdo novamente, ao selecionar, clicar na opção Refresh para atualizar.
7. Consultar se foi criado o Database

# Criar a conexão usando comando

1. Abri consulta
```bash
   docker exec -it nomebanco nomedaimagem -u root -p
   docker exec -it mysql mysql -u root -p
```

2. Criar a tabela
```bash
   CREATE DATABASE nome_do_banco;
```

# Testar Conexão com MySQL

***Eu estou usando bancodados e Imagem com mysql***

1 Digite a senha definida para o banco.

2. **Selecionar o database que iremos utilizar**
```bash
   USE nome-do-servidor/banco;
```

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
```

3. **Inserir Dados:**

```bash
   INSERT INTO users (id, first_name, last_name, gender, email) VALUES (1, 'Teste', 'Teste', 'male', 'teste@gmail.com');
```

4. **Consultar Dados:**
```bash
   SELECT * FROM users;
```

## Configuração e Definição da Conexão com o BackEnd

***No projeto, isso no VsCODE, acessar a pasta que o projeto está hospedado e rodar os comandos abaixo.***

# Compilar e Rodar o Projeto Java

1. **Configurar Java 17:**
```bash
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

1.1 **Verificar versão do Java e saber se está correta**

java -version

2. **Limpar e Buildar Projeto:**
   
```bash
   mvn clean
```

2.2 
```bash
   mvn -Dmaven.test.skip=true package
```

3. **Executar Aplicação:**
```bash
   mvn spring-boot:run
```

## Tratar possíveis erros

1. Se a conexão não for bem sucedida, tentar os comandos abaixo.

Certifique-se de que o usuário myuser foi criado no MySQL com as permissões adequadas:
Execute os seguintes comandos no MySQL para garantir que o usuário foi criado corretamente e tem acesso ao banco de dados javamysqldb.

1. Abri consulta
```bash
   docker exec -it nomebanco nomedaimagem -u root -p
   docker exec -it mysql mysql -u root -p
```

1.1.
```bash
   CREATE USER 'myuser'@'%' IDENTIFIED BY '123456';
   GRANT ALL PRIVILEGES ON javamysqldb.* TO 'myuser'@'%';
   FLUSH PRIVILEGES;
```

2. Verifique o endereço IP do contêiner:
O erro também pode ser causado se o contêiner MySQL estiver usando um IP que não está permitido para o usuário myuser. Tente permitir o acesso a partir de qualquer host usando myuser:

```bash
   GRANT ALL PRIVILEGES ON javamysqldb.* TO 'myuser'@'%' IDENTIFIED BY '123456';
   FLUSH PRIVILEGES;
``` 
2.1. Encerrar sessão no terminal com command + z ou ctrl + C

3. Verifique se o contêiner MySQL está acessível:
Certifique-se de que o contêiner MySQL está rodando e escutando na porta correta (3306). Você pode verificar isso executando o comando:

```bash
   docker ps
```

4. Reiniciar o container
```bash
   docker stop CONTAINER_ID
```
4.1 
```bash
docker start CONTAINER_ID
```
5. Rodar o projeto do back de novo

5.1. **Limpar e Buildar Projeto:**
   
```bash
   mvn clean
``` 

5.2. 
```bash
   mvn -Dmaven.test.skip=true package
```

3. **Executar Aplicação:**
```bash
   mvn spring-boot:run
```

## Criar visualização usando o Swagger

***Este processo visa nos ajudar a avaliar os serviços que foram criados e se testar o funcionamento deles***

1. Abrir o arquivo pom.xml e adicionar uma nova dependência
**Estou seguindo este arquivo como base https://springdoc.org/**

```bash
   <dependency>
      <groupId>org.springdoc</groupId>
      <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
      <version>2.6.0</version>
   </dependency>
```

2. Depois de rodar a aplicação, testar no navegador usando a rota:
```bash
http://localhost:8080/swagger-ui/index.html
```
3. Como saber que deu certo?
**Vai mostrar os Controlles e Serviços**

4. Depois disso, pode seguir os próximos passos, para inserir o projeto no Docker.

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
``` 

4. **Executar Container do BackEnd:**
```bash
   docker run --name backend --network my_network -p 8080:8080 back-end
```

5. **Verificar JAR Gerado:**
```bash
   ls target
```

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
```

3. **Executar Container do FrontEnd:**
```bash
   docker run --name react-app -p 3000:3000 front-end
```

## Juntar Tudo com Docker Network
***De forma isolada, cada um funciona. Quando se trata de rodar os dois ao mesmo tempo no sistema Docker, eles precisam (Banco e Back) estarem na mesma Network***

1. **Listar as Network existentes na máquina**
```bash
   docker network ls
```

2. **Apagar todas as redes de for necessário - Tomar cuidado aqui**
```bash
   docker network prune
```

2.1 **Apagar uma específica**
```bash
   docker network rm <network_name>
```

3. **Criar Network:**
```bash
   docker network create my_network
```

4. Consultar em qual Network os containers mysql e back-end estão:

```bash
   docker inspect mysql | grep NetworkMode
```

```bash
   docker inspect back-end | grep NetworkMode
```

2. **Conectar um dos Containers à Network:**
```bash
   docker network connect my_network mysql
```

```bash
   docker network connect my_nerwork back-end
```

**Exemplo para Rodar Container do BackEnd na Network:**
```bash
   docker run --name backend --network my_network -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:mysql://meubancomysql:3306/javamysqldb -e SPRING_DATASOURCE_USERNAME=myuser -e SPRING_DATASOURCE_PASSWORD=123456 back-end
```

## Testar Aplicação

1. **Verificar Funcionamento:**

1.1 Use o Postman, Swagger ou navegador para testar a API e o banco de dados.

2. **Confirmar Configurações:**
Verifique se os dados no application.properties estão corretos.

3. **Verificar Banco de Dados:**
```bash
   SHOW DATABASES;
```

4. Se mostrar a tabela, significa que deu certo o processo.


