import { spec } from 'pactum'; 
import { expect } from "chai"; 

export class BaseSteps {

  static async cadastrar(url, body) {
    let cadastrar = await spec()
      .post(url)
      .withHeaders('Content-Type', 'application/json')
      .withBody(body);

    let resposta = { json: cadastrar.json, statusCode: cadastrar.statusCode, statusMessage: cadastrar.statusMessage };

    return resposta;
  };

  static async atualizar(url, body) {
    let atualizar = await spec()
      .put(url + `/${body.id}`)
      .withHeaders('Content-Type', 'application/json')
      .withBody(body);

    let resposta = { json: atualizar.json, statusCode: atualizar.statusCode, statusMessage: atualizar.statusMessage };

    return resposta;
  };

  static async consultar(url, id) {
    let consultar = await spec()
      .get(url + `/${id}`);

    let resposta = { json: consultar.json, statusCode: consultar.statusCode, statusMessage: consultar.statusMessage };
    
    return resposta;
  };

  static async deletar(url, id) {
    return await spec()
      .delete(url + `/${id}`);
  };

  static respostaOK(resposta, body) {
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).to.be.eql(body);
  };

  static respostaCreated(resposta, body) {
    expect(resposta.statusCode).to.be.eql(201);
    expect(resposta.statusMessage).to.be.eql('Created');
    expect(resposta.json).to.be.eql(body);
  };

  static respostaOKEArrayNaoVazio(resposta) {
    let totalItems = resposta.json.length;

    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).to.be.an('array').that.is.not.empty;
    expect(totalItems).to.be.above(0);
  };

  static respostaBadRequest(resposta, mensagem) {
    expect(resposta.statusCode).to.be.eql(400);
    expect(resposta.json.title).to.be.eql(mensagem);
    expect(resposta.statusMessage).to.be.eq('Bad Request');
    expect(resposta.json.errors).not.be.empty;
  };

  static respostaNotFound(resposta) {
    expect(resposta.statusCode).to.be.eql(404);
    expect(resposta.json.title).to.be.eq('Not Found');
  };
}

