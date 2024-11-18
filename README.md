# Cybershop

Cybershop é um projeto pessoal para portfólio que consiste em uma loja virtual construída com React + Vite e um banco de dados simulado através da biblioteca json-server + middlewares.

Este projeto foi inspirado pelo exercício de carrinho de compras do curso de React do [The Odin Project](https://www.theodinproject.com/).

O que seria um simples exercício de funcionalidades básicas do React acabou evoluindo para uma aplicação quase completa, onde o usuário é capaz de criar uma conta, associar endereços e cartões de crédito a essa conta, gerenciar o histórico de pedidos, fazer cáclulos de frete, entre outros recursos.

Os produtos da loja são carregados através de requisições à API [fakestoreapi](https://fakestoreapi.com/), que fornece as imagens, descrições, qualificações e outras informações de forma facilitada. Como o idioma dessas informações é o inglês, o site apresenta uma inconsistência de idiomas que deverá ser sanada nas próximas atualizções.

O procedimento de checkout permite a escolha de formas de entrega e métodos de pagamento diferentes, aplicação de código de desconto, além de gerenciar inteligentemente os dados de compra do usuário. Caso o usuário não tenha dados armazenados em sua conta, o checkout salvará automaticamente aqueles inseridos no momento da compra. Posteriormente, o usuário terá a oportunidade de editar ou adicionar outros dados através do painel do usuário.

## Recursos da aplicação

- Acessibilidade: Um dos maiores desafios deste projeto foi adaptar o site para as tecnologias assistivas, principalmente em relação aos elementos que sofrem mudanças em sua funcionalidade dependendo do tamanho da tela, como um menu que se transforma em um dropdown na versão de celular. Componentes que eu estava orgulhoso sobre a organização e simplicidade acabaram ficando mais complexos ao lidar com regras de ARIA e navegação por teclado, mas é definitivamente algo gratificante de aprender e aplicar.

- Responsividade: O site utiliza um sistema fluido de medidas para o tamanho das fontes e dos espaços negativos, graças ao sistema revolucionário criado pelos geniais fundadores do [Utopia](https://utopia.fyi/). O site se comporta bem na grande maioria dos tamanhos de tela com apenas um media query, e já possui atualizações de melhoria a caminho.

- Temas claro/escuro.

- Autenticação do usuário: a autenticação é feita com JWTs (Json Web Tokens). Quando um usuário faz login, dois tokens são gerados: um access token de curta duração que vive apenas na memória do React, e um refresh token de longa duração que vive apenas no backend, em forma de cookie http-only. O access token é usado para autenticar o usuário em todas as requisições feitas ao banco de dados. Sempre que o servidor recebe um access token inexistente um inválido, ele tentará gerar um novo, caso o refresh token ainda esteja ativo. Isso permite que o usuário permaneça autenticado mesmo depois de fechar o navegador, sem a necessidade de armazenar tokens no local storage.

A comunicação do front com o backend é feita através de uma instância dedicada do axios, que usa interceptadores de requisições e respostas para lidar com os dados de autenticação.

- Route Guard: O redirecionamento de rotas foi aplicado com o react-router-dom para evitar que o usuário acesse etapas do checkout prematuramente, e para proteger áreas exclusivas para usuários logados.

- Integrações de API: a aplicação usa Axios para requisitar produtos da fakestoreapi, bem como para performar operações CRUD no banco de dados do json-server.

- Middlewares: vários middlewares são usados para lidar com a autenticação do usuário, a proteção de rotas, entre outras necessidades.

## Projeto Online

Você pode visitar a loja online [aqui](https://cybershop-client.onrender.com/). Nota: por estar hospedado em um plano gratuito do Render, a primeira interação com o site pode demorar alguns segundos para ter resposta.

## Contribuição

Este projeto é para fins de portfólio e não aceita contribuições externas.

## Licença

Você tem permissão para compartilhar o projeto, desde que atribua o devido crédito e não faça modificações. Você não pode usar o material para fins comerciais.

## Autor

- Nome: Pedro Sofal
- LinkedIn: https://www.linkedin.com/in/pedrosofal/
- Behance: https://www.behance.net/pedrosofal
- Email: pedrosofal@gmail.com