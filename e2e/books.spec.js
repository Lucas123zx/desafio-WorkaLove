const { spec } = require('pactum');
const { expect } = require("chai");
require('dotenv').config();
const Livro = require('../src/util/livro');
const BaseSteps = require('../src/util/baseSteps');

describe("Recurso Books", async () => {

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
  it('Consultar todos os livros com sucesso', async () => {
    await BaseSteps.cadastrar(urlBook, livro);

    let consulta = await spec().get(urlBook);
    resposta = { json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage };

    BaseSteps.respostaOKEArrayNaoVazio(resposta);
  });
  it('Consultar um livro com sucesso', async () => {
    resposta = await BaseSteps.consultar(urlBook, 3);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.empty;
  });
  it('Consultar um livro não encontrado', async () => {
    resposta = await BaseSteps.consultar(urlBook, 999);
    BaseSteps.respostaNotFound(resposta);
  });
  it('Criar um livro com sucesso', async () => {
    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });
  it('Criar um livro informando identificador vinculado a outro livro cadastrado no sistema', async () => {
    livro.id = 1;

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta, 'Id vinculado a outro livro no sistema');

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id)
    BaseSteps.respostaNotFound(resposta);
  });
  it('Criar um livro sem informar titulo', async () => {
    livro.title = "";

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta, 'Titulo é um campo obrigatório');

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id)
    BaseSteps.respostaNotFound(resposta);
  });
  it('Criar um livro sem informar descrição', async () => {
    livro.description = "";

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);
    expect(resposta.json.description).to.be.empty;

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });
  it('Criar um livro sem informar quantidade de páginas', async () => {
    livro.pageCount = 0;

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta, 'PageCount é um campo obrigatório');
    expect(resposta.json.pageCount).to.be.eq(0);

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    BaseSteps.respostaNotFound(resposta);
  });
  it('Criar um livro sem informar um resumo', async () => {
    livro.excerpt = "";

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);
    expect(resposta.json.excerpt).to.be.empty;

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });
  it('Criar um livro sem informar data de publicação', async () => {
    livro.publishDate = "";

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta, 'One or more validation errors occurred.');

    resposta = await BaseSteps.consultar(urlBook, livro.id);
    BaseSteps.respostaNotFound(resposta);
  });
  it('Criar um livro sem informar identificador', async () => {
    livro.id = 0;

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta, 'Id é um campo obrigátorio');

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    BaseSteps.respostaNotFound(resposta);
  });
  it('Atualizar um livro com sucesso', async () => {
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    BaseSteps.respostaOK(resposta, livro);
  });
  it('Atualizar um livro informando identificador vinculado a outro livro cadastrado no sistema', async () => {
    livro.id = 200;

    let atualizar = await spec()
      .put(urlBook + `/${livro.id}`)
      .withHeaders('Content-Type', 'application/json')
      .withBody({
        "id": 1,
        "title": meuLivro.title,
        "description": meuLivro.description,
        "pageCount": meuLivro.pageCount,
        "excerpt": meuLivro.excerpt,
        "publishDate": meuLivro.publishDate
      });
      
    resposta = { json: atualizar.json, statusCode: atualizar.statusCode, statusMessage: atualizar.statusMessage };
    BaseSteps.respostaBadRequest(resposta, 'Id vinculado a outro livro no sistema');

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.eql(livro);
  });
  it('Atualizar um livro sem informar titulo', async () => {
    livro.title = "";
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);      
    BaseSteps.respostaBadRequest(resposta, 'titulo é um campo obtigatório');   

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.eql(livro);
  });
  it('Atualizar um livro sem informar descrição', async () => {
    livro.description = "";
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);    
    BaseSteps.respostaOK(resposta, livro);   

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    BaseSteps.respostaOK(resposta, livro)
  });
  it('Atualizar um livro sem informar quantidades de páginas', async () => {
    livro.pageCount = 0;
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);    
    BaseSteps.respostaBadRequest(resposta, 'PageCount é um campo obrigatório');   

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.eql(livro);
  });
  it('Atualizar um livro sem informar um resumo', async () => {
    livro.excerpt = "";
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);  
    BaseSteps.respostaOK(resposta, livro);   

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    BaseSteps.respostaOK(resposta, livro);
  });
  it('Atualizar um livro sem data de publicação', async () => {
    livro.publishDate = "";
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);  
    BaseSteps.respostaBadRequest(resposta, 'One or more validation errors occurred.');   

    resposta = await BaseSteps.consultar(urlBook, livro.id);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.eql(livro);
  });
  it('Atualizar um livro sem identificador', async () => {
    livro.id = 200;

    let atualizar = await spec()
      .put(urlBook + `/${livro.id}`)
      .withHeaders('Content-Type', 'application/json')
      .withBody({
        "id": 0,
        "title": meuLivro.title,
        "description": meuLivro.description,
        "pageCount": meuLivro.pageCount,
        "excerpt": meuLivro.excerpt,
        "publishDate": meuLivro.publishDate
      });
      
    resposta = { json: atualizar.json, statusCode: atualizar.statusCode, statusMessage: atualizar.statusMessage };
    BaseSteps.respostaBadRequest(resposta, 'Id é um campo obrigatório');

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.eql(livro);
  });
  it('Atualizar um livro não encontrado', async () => {
    livro.id = 202;

    resposta = await BaseSteps.atualizar(urlBook, livro);
    BaseSteps.respostaNotFound(resposta);

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.eql(livro);
  });
  it('Remover um livro com sucesso', async () => {
    let consulta = await spec().get(urlBook);
    resposta = { json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage };

    const totalBooks = resposta.json.length;
    const bookAleatorio = Math.floor(Math.random() * totalBooks);

    resposta = await BaseSteps.deletar(urlBook, bookAleatorio);

    resposta = await BaseSteps.consultar(urlBook, bookAleatorio);
    BaseSteps.respostaNotFound(resposta);
  });
  it('Remover um livro não encontrado', async () => {
    const bookIdentificador = 999;
    resposta = await BaseSteps.deletar(urlBook, bookIdentificador);
    BaseSteps.respostaNotFound(resposta);
  });

});
