const { spec } = require('pactum');
const { expect } = require('chai');
require('dotenv').config();
const BaseSteps = require('../src/util/baseSteps');
const Autor = require('../src/util/autor');

  describe("Recurso Authors" , async () => {
    
  const urlAuthor = process.env.BASE_URL + "/api/v1/Authors";
  const author = Autor.criarAutor();

  let resposta;
  
  it('Consultar lista de autores com sucesso', async() => {
    await BaseSteps.cadastrar(urlAuthor, author);

    let consulta = await spec().get(urlAuthor);

    resposta = { json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage };

    BaseSteps.respostaOKEArrayNaoVazio(resposta);
  });
  it('Consultar livros por autor com sucesso', async() => {
    await BaseSteps.cadastrar(urlAuthor, author);

    resposta = await BaseSteps.consultar(`${urlAuthor}/authors/books`, author.idBook);

    BaseSteps.respostaOKEArrayNaoVazio(resposta);
    expect(resposta.json).to.be.contain(author);
  });
  it('Consultar livros por autor não encontrado', async() => {

    resposta = await BaseSteps.consultar(`${urlAuthor}/authors/books`, 999);

    BaseSteps.respostaNotFound(resposta);
  });
 
});