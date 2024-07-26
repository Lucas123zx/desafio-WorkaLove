const { expect } = require('chai');
const { spec } = require('pactum');

class BaseSteps {

  static async cadastraLivro(urlBook, livro) {
    let cadastra = await spec()
      .post(urlBook)
      .withHeaders('Content-Type', 'application/json')
      .withBody(livro);

    let resposta = { json: cadastra.json, statusCode: cadastra.statusCode, statusMessage: cadastra.statusMessage };

    return resposta;
  };

  static async consultaLivro(urlBook, id) {
    let consulta = await spec()
      .get(urlBook + `/${id}`);

    let resposta = { json: consulta.json, statusCode: consulta.statusCode, statusMessage: consulta.statusMessage };
    return resposta;
  };

  static async deletaLivro(urlBook, id) {
    return await spec()
      .delete(urlBook + `/${id}`);
  };

  static respostaOK(resposta, livro) {
    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).to.be.eql(livro);
  };

  static respostaOKEArrayNaoVazio(resposta) {
    let totalBooks = resposta.json.length;

    expect(resposta.statusCode).to.be.eql(200);
    expect(resposta.statusMessage).to.be.eql('OK');
    expect(resposta.json).to.be.an('array').that.is.not.empty;
    expect(totalBooks).to.be.above(0);
  };

  static respostaBadRequest(resposta) {
    expect(resposta.statusCode).to.be.eql(400);
    expect(resposta.json.title).to.be.eql('One or more validation errors occurred.');
    expect(resposta.statusMessage).to.be.eq('Bad Request');
    expect(resposta.json.errors).not.be.empty;
  };

  static respostaNotFound(resposta) {
    expect(resposta.statusCode).to.be.eql(404);
    expect(resposta.json.title).to.be.eq('Not Found');
  };
}

module.exports = BaseSteps;