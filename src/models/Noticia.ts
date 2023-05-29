export default class Noticia {
	tag: string = "";
	titulo: string = "";
	dataDePublicacao: string = "";
	texto: string = "";
	tempoMedioLeitura: string = "";
	imagem: string = "";

	GenerateNoticia(
		tag: string,
		titulo: string,
		dataDePublicacao: string,
		texto: string,
		tempoMedioLeitura: string,
		imagem: string
	) {
		this.tag = tag;
		this.titulo = titulo;
		this.dataDePublicacao = dataDePublicacao;
		this.texto = texto;
		this.tempoMedioLeitura = tempoMedioLeitura;
		this.imagem = imagem;
		return this;
	}
}
