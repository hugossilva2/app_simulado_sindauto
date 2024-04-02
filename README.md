# Projeto Quiz

Este é um projeto de quiz interativo que permite aos usuários responderem a perguntas de múltipla escolha e verem sua pontuação no final. O projeto é dividido em uma API back-end, construída com Express.js e Prisma, e um front-end simples, feito com HTML, CSS e JavaScript puro.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Prisma
- SQLite (ou outro DB de sua escolha)
- HTML
- CSS
- JavaScript

## Configuração

Para executar este projeto localmente, você precisará ter o Node.js instalado em sua máquina. Siga as instruções abaixo para configurar o projeto:

1. Clone o repositório:

git clone 
cd 


2. Instale as dependências:


3. Configure o banco de dados:

Edite o arquivo `.env` na raiz do projeto para apontar para o seu banco de dados.

4. Execute as migrações do Prisma:


5. Popule o banco de dados:


6. Inicie o servidor:



Isso iniciará o servidor Express na porta 3000.

7. Abra o `index.html` no seu navegador para acessar o front-end do quiz.

## Uso

Depois de iniciar o servidor e abrir o `index.html` no navegador, você será capaz de:

- Visualizar e responder às perguntas do quiz.
- Ver sua pontuação após responder a todas as perguntas.

## Contribuições

Contribuições são sempre bem-vindas! Por favor, leia o arquivo CONTRIBUTING.md (se disponível) para detalhes sobre nosso código de conduta e o processo para enviar pedidos de pull.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE.md (se disponível) para mais detalhes.
