### desafio-WorkaLove
Este documento descreve os testes automatizados realizados para verificar a funcionalidade da API. O objetivo é garantir que os endpoints Livros e Autores funcionem conforme o esperado e que os dados sejam manipulados corretamente.


#### Ferramentas instalados
  -  [pactumJS](https://pactumjs.github.io/)
  -  [dotEnv](https://www.npmjs.com/package/dotenv)
  -  [Chai](https://www.chaijs.com/)
  -  [Mochawesome](https://www.npmjs.com/package/mochawesome)
  -  [Postman](https://www.postman.com/)

---

#### Pré requisitos & Instalação de dependências: 
 1. [Node.Js](https://nodejs.org/pt/download/package-manager)
 2. IDE
 3. Clonar projeto `git clone https://github.com/Lucas123zx/desafio-WorkaLove.git`
 4. Executar o comando `npm install` no terminal.

---
## Estrutura dos Arquivos
    ├── .vscode/
    │   ├── launch.json
    ├── collections
    │   ├── test_api.py
    ├── report/
    │   ├── test_api.py
    ├── src/
    │   ├── util/
    │     ├── baseSteps.js/
    │     ├── Livro.js/
    ├── e2e/
    │   ├── books.js
    ├── .env
    ├── .gitignore
    ├── .package.json
    └── README.md
---


### Observações
1. Documentação:
    - Não possui respostas esperadas para fluxos de exceções
    - Alguns recurso são confusos - Exemplo Authors
    - Falta de descrição nos recursos da api
2. API Restfull:
    - Possui Métodos Claros:
      - Get: Recupera
      - Put: Atualiza
      - Delete: Exclui
      - Post: Cria
3. API:
      - Resposta são estáticas
  


