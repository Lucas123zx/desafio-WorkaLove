import { spec } from 'pactum'; 
import { expect } from "chai"; 
import 'dotenv/config';
import { Autor } from '../src/util/autor.js';
import { BaseSteps } from '../src/util/baseSteps.js';

describe("Recurso Authors", async () => {
    
  const urlAuthor = process.env.BASE_URL + "/api/v1/Authors";
  
  let author;
  let resposta;
  
  it('Consultar lista de autores com sucesso', async() => {
    author = Autor.criarAutor();
    await BaseSteps.cadastrar(urlAuthor, author);

    let consulta = await spec().get(urlAuthor);

    resposta = { json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage };

    BaseSteps.respostaOKEArrayNaoVazio(resposta);
  });

  it('Consultar livros por autor com sucesso', async() => {
    author = Autor.criarAutor();
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