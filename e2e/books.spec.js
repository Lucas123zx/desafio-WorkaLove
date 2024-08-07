import { spec } from 'pactum'; 
import { expect } from "chai"; 
import 'dotenv/config';
import { Livro } from '../src/util/livro.js';
import { BaseSteps } from '../src/util/baseSteps.js';

describe("Recurso Books", async () => {

  const urlBook = process.env.BASE_URL + "/api/v1/Books";
  
  let livro;
  let resposta;
  
  it('Consultar todos os livros com sucesso', async () => {
    livro = Livro.criarLivro();
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
    livro = Livro.criarLivro();
    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaCreated(resposta, livro);

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Criar um livro informando identificador vinculado a outro livro cadastrado no sistema', async () => {
    livro = Livro.criarLivro();  
    livro.id = 1;

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta, 'Id vinculado a outro livro no sistema');

    resposta = await BaseSteps.consultar(urlBook, livro.id)
    BaseSteps.respostaNotFound(resposta);
  });

  it('Criar um livro sem informar titulo', async () => {
    livro = Livro.criarLivro();
    livro.title = "";

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta, 'Titulo é um campo obrigatório');
    expect(resposta.json.title).to.be.empty;


    resposta = await BaseSteps.consultar(urlBook, livro.id)
    BaseSteps.respostaNotFound(resposta);
  });

  it('Criar um livro sem informar descrição', async () => {
    livro = Livro.criarLivro();
    livro.description = "";

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaCreated(resposta, livro);
    expect(resposta.json.description).to.be.empty;

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id)
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Criar um livro sem informar quantidade de páginas', async () => {
    livro = Livro.criarLivro();
    livro.pageCount = 0;

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta, 'PageCount é um campo obrigatório');
    expect(resposta.json.pageCount).to.be.eq(0);

    resposta = await BaseSteps.consultar(urlBook, livro.id);
    BaseSteps.respostaNotFound(resposta);
  });

  it('Criar um livro sem informar um resumo', async () => {
    livro = Livro.criarLivro();
    livro.excerpt = "";

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaCreated(resposta, livro);
    expect(resposta.json.excerpt).to.be.empty;

    resposta = await BaseSteps.consultar(urlBook, livro.id)
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Criar um livro sem informar data de publicação', async () => {
    livro = Livro.criarLivro();
    livro.publishDate = "";
    livro.id = 201;

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta, 'One or more validation errors occurred.');

    resposta = await BaseSteps.consultar(urlBook, livro.id);
    BaseSteps.respostaNotFound(resposta);
  });

  it('Criar um livro sem informar identificador', async () => {
    livro = Livro.criarLivro();
    livro.id = 0;

    resposta = await BaseSteps.cadastrar(urlBook, livro);
    BaseSteps.respostaBadRequest(resposta, 'Id é um campo obrigátorio');
    expect(resposta.json.id).to.be.eql(0);

    resposta = await BaseSteps.consultar(urlBook, livro.id);
    BaseSteps.respostaNotFound(resposta);
  });

  it('Atualizar um livro com sucesso', async () => {
    livro = Livro.criarLivro();
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);
    BaseSteps.respostaOK(resposta, livro);

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Atualizar um livro informando identificador vinculado a outro livro cadastrado no sistema', async () => {
    livro = Livro.criarLivro();
    livro.id = 200;

    let atualizar = await spec()
      .put(urlBook + `/${livro.id}`)
      .withHeaders('Content-Type', 'application/json')
      .withBody({
        "id": 1,
        "title": livro.title,
        "description": livro.description,
        "pageCount": livro.pageCount,
        "excerpt": livro.excerpt,
        "publishDate": livro.publishDate
      });
      
    resposta = { json: atualizar.json, statusCode: atualizar.statusCode, statusMessage: atualizar.statusMessage };
    BaseSteps.respostaBadRequest(resposta, 'Id vinculado a outro livro no sistema');

    resposta = await BaseSteps.consultar(urlBook, resposta.json.id);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.eql(livro);
  });

  it('Atualizar um livro sem informar titulo', async () => {
    livro = Livro.criarLivro();
    livro.title = "";
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);      
    BaseSteps.respostaBadRequest(resposta, 'titulo é um campo obtigatório');  
    expect(resposta.json.title).to.be.empty;

    resposta = await BaseSteps.consultar(urlBook, livro.id);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.eql(livro);
  });

  it('Atualizar um livro sem informar descrição', async () => {
    livro = Livro.criarLivro();
    livro.description = "";
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);    
    BaseSteps.respostaOK(resposta, livro);   
    expect(resposta.json.description).to.be.empty;

    resposta = await BaseSteps.consultar(urlBook, livro.id);
    BaseSteps.respostaOK(resposta, livro)
  });

  it('Atualizar um livro sem informar quantidades de páginas', async () => {
    livro = Livro.criarLivro();
    livro.pageCount = 0;
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);    
    BaseSteps.respostaBadRequest(resposta, 'PageCount é um campo obrigatório');   
    expect(resposta.json.pageCount).to.be.eql(0);

    resposta = await BaseSteps.consultar(urlBook, livro.id);
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).not.be.eql(livro);
  });

  it('Atualizar um livro sem informar um resumo', async () => {
    livro = Livro.criarLivro();
    livro.excerpt = "";
    livro.id = 200;

    resposta = await BaseSteps.atualizar(urlBook, livro);  
    BaseSteps.respostaOK(resposta, livro);   
    expect(resposta.json.expect).to.be.empty;


    resposta = await BaseSteps.consultar(urlBook, livro.id);
    BaseSteps.respostaOK(resposta, livro);
  });

  it('Atualizar um livro sem data de publicação', async () => {
    livro = Livro.criarLivro();
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
    livro = Livro.criarLivro();
    livro.id = 200;

    let atualizar = await spec()
      .put(urlBook + `/${livro.id}`)
      .withHeaders('Content-Type', 'application/json')
      .withBody({
        "id": 0,
        "title": livro.title,
        "description": livro.description,
        "pageCount": livro.pageCount,
        "excerpt": livro.excerpt,
        "publishDate": livro.publishDate
      });
      
    resposta = { json: atualizar.json, statusCode: atualizar.statusCode, statusMessage: atualizar.statusMessage };
    BaseSteps.respostaBadRequest(resposta, 'Id é um campo obrigatório');

    resposta = await BaseSteps.consultar(urlBook, 0);
    expect(resposta.statusCode).to.be.eql(404);
    expect(resposta.statusMessage).to.be.eql('Not Found');
  });

  it('Atualizar um livro não encontrado', async () => {
    livro = Livro.criarLivro();
    livro.id = 202;

    resposta = await BaseSteps.atualizar(urlBook, livro);
    BaseSteps.respostaNotFound(resposta);

    resposta = await BaseSteps.consultar(urlBook, livro.id);
    BaseSteps.respostaNotFound(resposta)
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
