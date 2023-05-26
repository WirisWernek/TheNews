import React, { useLayoutEffect, useState } from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, FlatList } from "native-base";
import { Card } from '../components/Card/Card';
import Noticia from "../models/Noticia";

function Home() {
	let tag: string = "PHOTOS";
	let titulo: string = "The Garden City";
	let dataDePublicacao: string = "Hoje";
	let texto: string = "Bengaluru (also called Bangalore) is the center of India's high-tech industry. The city is also known for its parks and nightlife.";
	let tempoMedioLeitura: string = "6 mins ago";
	let imagem: string = "https://reactnative.dev/img/tiny_logo.png";
	let imagem2: string = "https://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png";

	let noticia = new Noticia();
	noticia.tag = tag;
	noticia.titulo = titulo;
	noticia.dataDePublicacao = dataDePublicacao;
	noticia.texto = texto;
	noticia.imagem = imagem2;
	noticia.tempoMedioLeitura = tempoMedioLeitura;


	let teste = [0,1,2,3,4,5,6];
	return (
		<NativeBaseProvider >
			<Box safeArea alignItems="center">
				<Heading>Notícias</Heading>
				<FlatList
				data={teste}
				renderItem={({ item }) => (
					<Card noticia={noticia} />
				)}
				/>
			</Box>
		</NativeBaseProvider>
	);
}

export default Home;