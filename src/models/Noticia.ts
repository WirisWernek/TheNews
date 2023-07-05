export default class Noticia extends Object{
	tag: string = "";
	titulo: string = "";
	dataDePublicacao: string = "";
	texto: string = "";
	tempoMedioLeitura: string = "";
	imagem: string = "";
	criador: string = "";
	uidCriador: string = "";

	GenerateNoticia(
		tag: string,
		titulo: string,
		dataDePublicacao: string,
		texto: string,
		tempoMedioLeitura: string,
		imagem: string,
		criador: string,
		uidCriador: string
	) {
		this.tag = tag;
		this.titulo = titulo;
		this.dataDePublicacao = dataDePublicacao;
		this.texto = texto;
		this.tempoMedioLeitura = tempoMedioLeitura;
		this.imagem = imagem;
		this.criador = criador;
		this.uidCriador = uidCriador;
		return this;
	}
}
