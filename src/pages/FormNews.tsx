import React, { useEffect, useLayoutEffect, useState } from "react";
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
} from "native-base";
import UploadFoto from "../components/Card/UploadImage";
import Noticia from "../models/Noticia";
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_STORAGE } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import StorageService from "../services/storage";

export default function FormNews({ navigation, route }: any) {

	const [id, setId] = useState(route.params != undefined ? route.params.id : '');
	let noticia = new Noticia();
	const [tag, setTag] = useState("");
	const [titulo, setTitulo] = useState("");
	const [dataDePublicacao, setDataDePublicacao] = useState(currentDay());
	const [texto, setTexto] = useState("");
	const [tempoMedioLeitura, setTempoMedioLeitura] = useState("");
	const [imagem, setImagem] = useState("");
	const [criador, setCriador] = useState('');
	const [uidCriador, setUidCriador] = useState('');
	const [imagemAntiga, setImagemAntiga] = useState("");
	noticia = noticia.GenerateNoticia(tag, titulo, dataDePublicacao, texto, tempoMedioLeitura, imagem, criador, uidCriador, []);
	const service = new StorageService(); 

	useEffect(() => {
		setId(route.params != undefined ? route.params.id : '')
		if(id != null && id.trim() != ''){
			fetchNoticia();
		}
		console.log("Atualizei")
    }, [route.params]);


	async function reset() {
		clearNoticia()
	}

	async function fetchNoticia() {
        const colecao = doc(FIREBASE_DB, 'Noticias', id);
        const colecaoSnapshot = await getDoc(colecao);
        if (colecaoSnapshot.exists()) {
           setDataDePublicacao(colecaoSnapshot.data().dataDePublicacao);
		   setTag(colecaoSnapshot.data().tag);
		   setImagem(colecaoSnapshot.data().imagem);
		   setImagemAntiga(imagem);
		   setTexto(colecaoSnapshot.data().texto);
		   setTempoMedioLeitura(colecaoSnapshot.data().tempoMedioLeitura);
		   setCriador(colecaoSnapshot.data().criador);
		   setTitulo(colecaoSnapshot.data().titulo);
		   setUidCriador(colecaoSnapshot.data().uidCriador);
        }
    }

	const update = async () =>{
		if( uidCriador === null || uidCriador == "undefined" || uidCriador.trim() == '' ){
			alert("Você precisa estar logado para criar notícias!");
			return;
		}

		let erros = validate();
		if(erros.length > 0 ){
			alert(erros.join(""))
		}else{
			const colecao = doc(FIREBASE_DB, 'Noticias', id);
			if(imagem == imagemAntiga){
				let linkImagem = await salvarImagem(imagem);
				setImagem(linkImagem!);
			}else{
				
			}
			await updateDoc(colecao, {
				titulo: noticia.titulo,
				tag: noticia.tag,
				dataDePublicacao: noticia.dataDePublicacao,
				texto: noticia.texto,
				tempoMedioLeitura: noticia.tempoMedioLeitura,
				imagem: noticia.imagem,
				criador: noticia.criador,
				uidCriador: noticia.uidCriador,
				curtido: noticia.curtiu
			});
			alert("Dados alterado com sucesso!");
			navigation.navigate('Home');
		}
    }

	function clearNoticia(){
		setTag("");
		setTitulo("");
		setDataDePublicacao(currentDay());
		setTexto("");
		setTempoMedioLeitura("");
		setImagem("");
		setId("");
		setUidCriador("");
		setCriador("");
	}

	async function salvarImagem(image: string){
		try {
			const storageRef = ref(
				FIREBASE_STORAGE,
				"images/" + new Date().getTime()
			);
			const response = await fetch(image);
			const blob = await response.blob();

			await uploadBytes(storageRef, blob);
			const imageUrl = await getDownloadURL(storageRef);
			setImagem(imageUrl.toString());
			return imageUrl.toString();
		} catch (error) {
			console.log(error);
			alert("Erro ao subir imagem \n" + error);
		}
	};

	const salvar = async () => {
		let nomeVar = await service.getData("nome");
		let uidVar = await service.getData("uid");
		
		setCriador(nomeVar!.toString());
		setUidCriador(uidVar!.toString());
		
		if( uidCriador === null || uidCriador == "undefined" || uidCriador.trim() == '' ){
			alert("Você precisa estar logado para criar notícias!");
			return;
		}
		
		console.log(uidCriador);

		let erros = validate();
		if(erros.length > 0 ){
			alert(erros.join(""))
		}else{
			let linkImagem = await salvarImagem(imagem);
			const doc = addDoc(collection(FIREBASE_DB, 'Noticias'), {
				titulo: noticia.titulo,
				tag: noticia.tag,
				dataDePublicacao: noticia.dataDePublicacao,
				texto: noticia.texto,
				tempoMedioLeitura: noticia.tempoMedioLeitura,
				imagem: linkImagem,
				criador: noticia.criador,
				uidCriador: noticia.uidCriador,
				curtido: noticia.curtido

			} );
			clearNoticia();
			alert("Noticia cadastrada!");
			navigation.navigate("Home");
		}
	}

	function currentDay(){
		const today = new Date();
		const yyyy = today.getFullYear().toString();
		let mm = today.getMonth() + 1;
		let dd = today.getDate();
		let day: string = dd.toString();
		let month: string = mm.toString();

		if (dd < 10) day = '0' + dd;
		if (mm < 10) month = '0' + mm;

		const formattedToday = day + '/' + month + '/' + yyyy;
		return formattedToday.toString();
	}

	function validate(){
		let erros: any[] = [];
		if (noticia.titulo == "") {
			erros.push("Informe o título!");
		}
		if (noticia.tag == "" ) {
			erros.push("\nInforme a tag!");
		}
		if (noticia.tempoMedioLeitura == "" ) {
			erros.push("\nInforme o Tempo médio de leitura!");
		}
		if (noticia.texto == "" ) {
			erros.push("\nInforme o Texto!");
		}
		if (noticia.dataDePublicacao == "" ) {
			erros.push("\nInforme a data de publicação!");
		}
		if (noticia.imagem == "") {
			erros.push("\nSuba uma imagem de evidência!");
		}
		if (noticia.uidCriador == "") {
			erros.push("\nCriador não encontrado!");
		}
		if (noticia.criador == "") {
			erros.push("\nCriador não encontrado!");
		}

		return erros;
	}

	return (
		<NativeBaseProvider>
			<ScrollView>
				<Box safeArea alignItems="center" marginBottom={2} >
					<Heading>Nova Notícia</Heading>
					<VStack width="90%" mx="3" maxW="400px" space={1} marginTop={5}>
						<Input isRequired isDisabled placeholder="User" value={criador} />
						<Input isRequired placeholder="Titulo" value={titulo} onChangeText={(t) => { setTitulo(t) }} />
						<Input isRequired placeholder="Tag" value={tag} onChangeText={(t) => { setTag(t) }} />
						<TextArea isRequired h={20} placeholder="Texto" w="100%" maxW={500} autoCompleteType={undefined} value={texto} onChangeText={(t) => { setTexto(t) }} />
						<Input isRequired placeholder="Tempo Médio de Leitura" value={tempoMedioLeitura} onChangeText={(t) => { setTempoMedioLeitura(t) }} />
						<Input isRequired isDisabled placeholder="Data de Publicação" value={dataDePublicacao} onChangeText={(t) => { setDataDePublicacao(t) }} />
						<HStack justifyContent={"space-between"}>
							<UploadFoto defineImage={setImagem} />
							<Button style={styles.buttonSave} onPress={id == null || id.trim() == '' ? salvar : update} endIcon={<Icon as={Ionicons} name="save" size="sm" />}>
							{id == null || id.trim() == '' ? "Cadastrar" : "Atualizar"}
							</Button>
							<Button colorScheme="secondary" onPress={() => reset()} endIcon={<Ionicons name="trash" size={24} color="black" />}>Resetar</Button>
						</HStack>
						{(id != null && id.trim() != '') && <Text>Suas curtidas serão resetadas ao atualizar</Text>}
						{imagem.trim() != '' &&
							(
								<View>
									<Heading alignSelf={"center"} size="md">Preview Image</Heading>
									<Image source={{ uri: imagem }} style={styles.stretch} />
								</View>)}
					</VStack>
				</Box>
			</ScrollView>
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
	buttonSave:{
		backgroundColor: "#8B5CF6",
	},
	buttonUploadImage:{
		backgroundColor: "#7BCBF9",
	}
});
