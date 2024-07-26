const { spec } = require('pactum');
const { expect } = require("chai");
require('dotenv').config();
const Livro = require('../src/util/livro');
const BaseSteps = require('../src/util/baseSteps');
const { afterEach, after } = require('mocha');

describe("Recurso Book", async () => {

  const urlBook = process.env.BASE_URL + "/api/v1/Books";
  const meuLivro = Livro.criarLivro();

  let resposta;

  let livro = {
    "id": meuLivro.id,
    "title": meuLivro.title,
    "description": meuLivro.description,
    "pageCount": meuLivro.pageCount,
    "excerpt": meuLivro.excerpt,
    "publishDate": meuLivro.publishDate
  };

  it('Recuperar todos os livros com sucesso', async () => {
    await BaseSteps.cadastraLivro(urlBook,livro);
    
    let consulta = await spec().get(urlBook);
    resposta = {json: consulta.json, statusCode: consulta.statusCode, statusMessage:consulta.statusMessage};

    BaseSteps.respostaOKEArrayNaoVazio(resposta);
  });

  it('Cria um livro com sucesso', async () => {
    resposta = await BaseSteps.cadastraLivro(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);

    resposta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Cria um livro sem informar titulo', async () => {
    livro.title = "";

    resposta = await BaseSteps.cadastraLivro(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);

    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK')
    expect(resposta.json.title).to.be.empty;
    expect(resposta.json).to.be.eql(livro);

    resposta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Cria um livro sem informar descrição', async () => {
    livro.description = "";

    resposta = await BaseSteps.cadastraLivro(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);

    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK')
    expect(resposta.json.description).to.be.empty;
    expect(resposta.json).to.be.eql(livro);

    resposta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Cria um livro sem informar quantidade de página', async () => {
    livro.pageCount = 0;

    resposta = await BaseSteps.cadastraLivro(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);

    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK')
    expect(resposta.json.pageCount).to.be.eq(0);
    expect(resposta.json).to.be.eql(livro);

    resposta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });

})
