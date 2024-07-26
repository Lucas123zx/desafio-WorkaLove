const { expect } = require('chai');
const { spec } = require('pactum');

class BaseSteps {

  static async cadastraLivro(urlBook,livro) {
    return await spec()
      .post(urlBook)
      .withHeaders('Content-Type', 'application/json')
      .withBody(livro);
  };

  static async consultaLivro(urlBook, id){
    return await spec()
      .get(urlBook + `/${id}`);
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
}

module.exports = BaseSteps;