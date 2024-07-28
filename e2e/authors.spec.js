const { spec } = require('pactum');
require('dotenv').config();
const BaseSteps = require('../src/util/baseSteps');
const Autor = require('../src/util/autor');

  describe("Recurso Authors" , async () => {
  const urlAuthor = process.env.BASE_URL + "/api/v1/Authors";
  const author = Autor.criarAutor();

  let resposta;
  
  it.only('Consulta todos os livros com sucesso', async() => {
    await BaseSteps.cadastrar(urlAuthor, author);

    let consulta = await spec().get(urlAuthor);

    resposta = { json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage };

    BaseSteps.respostaOKEArrayNaoVazio(resposta);
  });
 
});