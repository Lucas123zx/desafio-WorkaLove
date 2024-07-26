const { spec } = require('pactum');
const { expect } = require("chai");
require('dotenv').config();
const Livro = require('../src/util/livro');
const BaseSteps = require('../src/util/baseSteps');

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
  it('Consulta todos os livros com sucesso', async () => {
    await BaseSteps.cadastraLivro(urlBook, livro);

    let consulta = await spec().get(urlBook);
    resposta = { json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage };

    BaseSteps.respostaOKEArrayNaoVazio(resposta);
  });
  it('Consulta um livro com sucesso', async () => {
    resposta = await BaseSteps.consultaLivro(urlBook, 3);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.empty;
  });
  it('Consulta um livro não encontrado', async () => {
    resposta = await BaseSteps.consultaLivro(urlBook, 999);
    await BaseSteps.respostaNotFound(resposta);
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
    expect(resposta.json.title).to.be.empty;

    resposta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });
  it('Cria um livro sem informar descrição', async () => {
    livro.description = "";

    resposta = await BaseSteps.cadastraLivro(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);
    expect(resposta.json.description).to.be.empty;

    resposta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });
  it('Cria um livro sem informar quantidade de páginas', async () => {
    livro.pageCount = 0;

    resposta = await BaseSteps.cadastraLivro(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);
    expect(resposta.json.pageCount).to.be.eq(0);

    resposta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });
  it('Cria um livro sem informar um resumo', async () => {
    livro.excerpt = "";

    resposta = await BaseSteps.cadastraLivro(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);
    expect(resposta.json.excerpt).to.be.empty;

    resposta = await BaseSteps.consultaLivro(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });
  it('Cria um livro sem informar data de publicação', async () => {
    livro.publishDate = "";

    resposta = await BaseSteps.cadastraLivro(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta);
  });
  it('Cria um livro sem informar identificador', async () => {
    livro.id = 0;

    resposta = await BaseSteps.cadastraLivro(urlBook, livro);
    BaseSteps.respostaOK(resposta);
  });
  it('Remover um livro com sucesso', async () => {
    let consulta = await spec().get(urlBook);
    resposta = { json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage };

    const totalBooks = resposta.json.length;
    const bookAleatorio = Math.floor(Math.random() * totalBooks);

    resposta = await BaseSteps.deletaLivro(urlBook, bookAleatorio);

    resposta = await BaseSteps.consultaLivro(urlBook, bookAleatorio);
    await BaseSteps.respostaNotFound(resposta);
  });
  it('Remover um livro não encontrado', async () => {
    const bookIdentificador = 999;
    resposta = await BaseSteps.deletaLivro(urlBook, bookIdentificador);
    await BaseSteps.respostaNotFound(resposta);
  });


})
