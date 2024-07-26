const { spec } = require('pactum');
const { expect } = require("chai");
require('dotenv').config();
const Livro = require('../src/util/livro');
const BaseSteps = require('../src/util/baseSteps')

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

  before("Criar um livro", async () => {
    BaseSteps.cadastraLivro(urlBook,livro);
  });

  it('Recuperar todos os livros com sucesso', async () => {
    let consulta = await spec().get(urlBook);
    resposta = {json: consulta.json, statusCode: consulta.statusCode, statusMessage:consulta.statusMessage};

    BaseSteps.respostaOKEArrayNaoVazio(resposta);
  });

  it('Cria um livro com sucesso', async () => {
    let cadastra = await BaseSteps.cadastraLivro(urlBook, livro);
    resposta = {json: cadastra.json, statusCode: cadastra.statusCode, statusMessage:cadastra.statusMessage};
    BaseSteps.respostaOK(resposta, livro);

    let consulta = await BaseSteps.consultaLivro(urlBook, resposta.json.id);
    resposta = {json: consulta.json, statusCode: consulta.statusCode, statusMessage:consulta.statusMessage};
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Cria um livro sem informar titulo', async () => {
    livro.title = "";
    let cadastra = await BaseSteps.cadastraLivro(urlBook, livro);
    resposta = {json: cadastra.json, statusCode: cadastra.statusCode, statusMessage:cadastra.statusMessage};

    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK')
    expect(resposta.json.title).to.be.empty;
    expect(resposta.json).to.be.eql(livro);

    let consulta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    resposta = {json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage};
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Cria um livro sem informar descrição', async () => {
    livro.description = "";
    let cadastra = await BaseSteps.cadastraLivro(urlBook, livro);
    resposta = {json: cadastra.json, statusCode: cadastra.statusCode, statusMessage:cadastra.statusMessage};

    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK')
    expect(resposta.json.description).to.be.empty;
    expect(resposta.json).to.be.eql(livro);

    let consulta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    resposta = {json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage};
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Cria um livro sem informar quantidade de página', async () => {
    livro.pageCount = 0;
    let cadastra = await BaseSteps.cadastraLivro(urlBook, livro);
    resposta = {json: cadastra.json, statusCode: cadastra.statusCode, statusMessage:cadastra.statusMessage};

    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK')
    expect(resposta.json.pageCount).to.be.eq(0);
    expect(resposta.json).to.be.eql(livro);

    let consulta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    resposta = {json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage};
    BaseSteps.respostaOK(resposta, livro);
  });

})
