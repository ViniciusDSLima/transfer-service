TRANSFER-SERVICE  

Projeto com o intuito de simular transferencias entre clientes (lojistas e nao lojistas)

        Criacao do usuario

Informacoes: Os usuarios podem se cadastrar para realizar as operacoes com os seguintes campos {fullName, document, email, password, seller(true/false), balance}, os lojistas somente recebem dinheiro
Endpoint: POST /createUser

Body: {fullName: string, document: string. email: string, password: string, isSellet: string. balance: number}

         Transferencia
         
Informacoes: 
Realizo uma verificacao antes de realizar a transferencia e caso o usuario que queira fazer a transferencia seja um lojista, interrompemos a transacao.
Realizo a verificacao se o usuario existe na base de dados utilizando o email e o document dele.
Realizo a verificacao sobre o saldo atual da carteira do usuario antres de fazer a transferencia.
Utilizo o conceito de transaction nas tranferencias o que da seguranca financeira para os usuarios do sistema.
Endpoint: POST /transfer

Body: {anount: number, senderId: string. receiverId: string}

Pontos de Melhoria

Poderia melhorar na comunicacao entre as camadas utilizando algum padrao mais proveitoso em relacao ao factory, por exemplo o Facade.

Poderia tambemm utilizar mais do Single responsability principle no usecase de transferencia.

Poderia tambem ampliar a camada de cobertura dos testes para o repositoy ou utilizar algum teste automatizado.

Poderia ter melhorado nas mensagens de commits e ter reduzido a quantidade de commits realizados.

Outra pratica que poderia ser melhorada era utilizar mais branchs.

Como executar o projeto na sua maquina? 

Clone o repositorio;

Crie um arquivo .env na raiz do projeto e adicione essa variavel de ambiente:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bank?schema=public"

Rode o comando abaixo:

docker compose up -d

Aplicacao disponivel!!
