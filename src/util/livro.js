class Livro {

  constructor(id, titulo, descricao, quantidadePaginas, resumo, dataPublicacao) {
    this.id = id;
    this.title = titulo;
    this.description = descricao;
    this.pageCount = quantidadePaginas;
    this.excerpt = resumo;
    this.publishDate = dataPublicacao;
  }

  //// Representa o Livro

  static criarLivro() {

    const titulos = [
      "Percy Jackson a Batalha do Labirinto",
      "Pai Rico Pai Pobre",
      "Raphael Albino - Metodologias Ágeis",
      "Primo Rico",
      "Teste de Software",
      "Essencialismo"
    ];

    const descricoes = [
      "Percy o menino Ladrão",
      "Negociar ou saber fazer negocios?",
      "Conhece o Scrum?",
      "Seu Primeiro Bilhão",
      "Caixa Preta ou Caixa Branca, Qual Utilizar?",
      "Compre o que faz diferença na sua vida"
    ];

    const resumos = [
      "Percy está no labirinto em busca do raio de Zeus",
      "Existe um pai que diz para estudar e outro que incentiva o filho a saber fazer negócios",
      "Scrum, o novo modelo de desenvolvimento",
      "Triângulo negro",
      "Técnicas de Teste de Software",
      "Seja Minimalista"
    ];

    const livroAleatorio = Math.floor(Math.random() * titulos.length);
    const tituloLivro = titulos[livroAleatorio];
    const descricaoLivro = descricoes[livroAleatorio];
    const resumoLivro = resumos[livroAleatorio];
    const totalPaginasLivro = Math.floor(Math.random() * 200) + 100;
    const identificador = Math.floor(Math.random() * 1000) + 301;
    const dataPublicacaoLivro = new Date().toISOString();

    return new Livro(identificador, tituloLivro, descricaoLivro, totalPaginasLivro, resumoLivro, dataPublicacaoLivro);

    //// retornar a classe livro dados de um livro
  }
}

module.exports = Livro;