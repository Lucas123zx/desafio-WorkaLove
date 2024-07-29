## desafio-WorkaLove
Este documento descreve os testes automatizados realizados para verificar a funcionalidade da API. O objetivo é garantir que os endpoints Livros e Autores funcionem conforme o esperado e que os dados sejam manipulados corretamente.

---

### Ferramentas instaladas
  -  [pactumJS](https://pactumjs.github.io/)
  -  [dotEnv](https://www.npmjs.com/package/dotenv)
  -  [Chai](https://www.chaijs.com/)
  -  [Mochawesome](https://www.npmjs.com/package/mochawesome)
  -  [Postman](https://www.postman.com/)

---

### Pré requisitos & Instalação de dependências: 
 1. [Node.Js](https://nodejs.org/pt/download/package-manager);
 2. IDE;
 3. Clonar projeto `git clone https://github.com/Lucas123zx/desafio-WorkaLove.git`;
 4. Abra o projeto na sua ide;
 5. Executar o comando `npm install` no terminal;
 6. (Opcional) Importe os arquivos da pasta collections para o postman para visualizar o plano de teste.

---
### Estrutura dos Arquivos
    ├── .vscode/
    │   ├── launch.json [Debug]
    ├── collections   [Plano de Teste]
    │   ├── authors.postman_collection.json
    │   ├── books.postman_collection.json
    │   ├── workspace.postman_globals.json
    ├── report/
    │   ├── assests/
    │   ├── mochawesome.html [Relatório de Testes]
    │   ├── mochawesome.json
    ├── src/
    │   ├── util/ [class e basesSteps]
    │     ├── baseSteps.js
    │     ├── livro.js
    │     ├── autor.js
    ├── e2e/ [specs]
    │   ├── books.spec.js
    │   ├── authors.spec.js
    ├── .env
    ├── .gitignore
    ├── .package-lock.json
    ├── .package.json
    ├── README.md
    ├── Relatorio de Bugs.html
    └── Relatorio de Teste - Manuais.html
---

### Execuções: 

  - após instalados as dependencias.
  - Execute o comando no terminal de sua ide `npm run test`  executa os testes.
  - Ou execute o comando no terminal de sua ide `npm run test-reporter` executa os teste e gera relatório no final dos testes.
  - Relatório Presente na pasta report/mochawesome.html

---

### Observações
1. Documentação: Observações Gerais
    - Não possui respostas esperadas para fluxos de exceções
    - Alguns recurso são confusos - Exemplo Authors
    - Falta de descrição nos recursos da api
    - Ausencia de Regras de negócio
2. API Restfull: Pontos Fortes
    - Possui Métodos Claros:
      - Get: Recupera
      - Put: Atualiza
      - Delete: Exclui
      - Post: Cria
3. API: Pontos Fracos
      - Resposta são estáticas
      - Algumas resposta fora do padrão Exemplo ***POST: Status 201 , 'Created'***