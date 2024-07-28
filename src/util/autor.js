class Autor {

  constructor(id, idBook, nome, sobreNome) {
    this.id = id;
    this.idBook = idBook;
    this.firstName = nome;
    this.lastName = sobreNome;
  }

  //// Representa o Livro

  static criarAutor() {

    const nomes = [
      "Percy Jackson",
      "Yiago Nigro",
      "Raphael Albino",
      "Yara Kelly",
      "Pamela Almeida",
      "Icaro Raulino"
    ];

    const nomeAleatorio = Math.floor(Math.random() * nomes.length);
    const nome = nomes[nomeAleatorio];
    const sobreNome = "Alemida Lima Do Santo Amaral";
    const idLivro = Math.floor(Math.random() * 200);
    const identificador = Math.floor(Math.random() * 1000) + 201;
    return new Autor(identificador, idLivro, nome, sobreNome);

    //// retornar a classe Autor dados do Autor
  }
}

module.exports = Autor;