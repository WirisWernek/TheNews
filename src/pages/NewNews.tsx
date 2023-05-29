import React, { useLayoutEffect, useState } from "react";
import {
	Box,
	Heading,
	NativeBaseProvider,
	TextArea,
	Input,
	VStack,
	Button,
	Icon,
	HStack,
	AspectRatio,
} from "native-base";
import UploadFoto from "../components/Card/UploadImage";
import Noticia from "../models/Noticia";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";

export default function NewNews() {

	let noticia = new Noticia();
	const [tag, setTag] = useState("");
	const [titulo, setTitulo] = useState("");
	const [dataDePublicacao, setDataDePublicacao] = useState("");
	const [texto, setTexto] = useState("");
	const [tempoMedioLeitura, setTempoMedioLeitura] = useState("");
	const [imagem, setImagem] = useState("");

	noticia = noticia.GenerateNoticia(tag, titulo, dataDePublicacao, texto, tempoMedioLeitura, imagem);

	function salvar() {

	}

	return (
		<NativeBaseProvider>
			<Box safeArea alignItems="center" marginBottom={2} >
				<Heading>Nova Notícia</Heading>
				<VStack width="90%" mx="3" maxW="400px" space={1} marginTop={5}>
					<Input placeholder="Titulo" value={titulo} onChangeText={(t) => { setTitulo(t) }} />
					<Input placeholder="Tag" value={tag} onChangeText={(t) => { setTag(t) }} />
					<TextArea h={20} placeholder="Texto" w="100%" maxW={500} autoCompleteType={undefined} value={texto} onChangeText={(t) => { setTexto(t) }} />
					<Input placeholder="Tempo Médio de Leitura" value={tempoMedioLeitura} onChangeText={(t) => { setTempoMedioLeitura(t) }} />
					<Input placeholder="Data de Publicação" value={dataDePublicacao} onChangeText={(t) => { setDataDePublicacao(t) }} />
					<HStack justifyContent={"space-between"}>
						<UploadFoto defineImage={setImagem} />
						<Button colorScheme={"emerald"} endIcon={<Icon as={Ionicons} name="save" size="sm" onPress={salvar} />}>
							Salvar
						</Button>
					</HStack>
					{ imagem.trim() != '' && 
					(
					<View>
						<Heading alignSelf={"center"} size="md">Preview Image</Heading>
						<Image source={{uri: imagem}} style={styles.stretch} />
					</View>)}
				</VStack>
			</Box>
		</NativeBaseProvider>
	);
}
const styles = StyleSheet.create({
	container: {
	  paddingTop: 50,
	},
	stretch: {
	  height: 400,
	  resizeMode: 'cover',
	  margin: 2, 
	  borderRadius: 25,
	},
  });
  