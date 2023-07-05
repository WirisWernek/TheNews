import * as React from 'react';
import {
	Box,
	Heading,
	Text,
	Center,
	HStack,
	Stack,
	Button,
} from 'native-base';
import Noticia from '../../models/Noticia';
import { Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import StorageService from '../../services/storage';
import { FIREBASE_DB } from '../../../firebaseConfig';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

type Props = {
	noticia: Noticia,
	id: any,
	navigation: any
};

export function Card({ noticia, id, navigation }: Props) {
	const service = new StorageService(); 
	const [usuarioLogado, setUsuarioLogado] = useState('');
	const [uidUsuarioLogado, setUidUsuarioLogado] = useState('');
	
	const getData = async () => {
		try {
			let nomeVar = await service.getData("nome");
			let uidVar = await service.getData("uid");
	
			setUsuarioLogado(nomeVar!.toString());
			setUidUsuarioLogado(uidVar!.toString());
		} catch (e) {
			console.log(e)
		}
	  };
	
	function alterar(id){
		console.log("Alterando " + id);
		navigation.navigate('FormNews', {id})
	}

	async function excluir(id){
		console.log("Excluindo " + id);
		try {
            const colecao = collection(FIREBASE_DB, 'Noticias');
            const elemento = doc(colecao, id);
            await deleteDoc(elemento);
            alert("Elemento excluido!");
        } catch (error) {
            alert("Falha ao excluir! " + error)
        }
	}

	async function curtir(id){
		if(uidUsuarioLogado == noticia.uidCriador){
			alert("Você não pode curtir suas noticias");
			return;
		}
		console.log("Curtindo " + id);
		try {
			if(noticia.curtido == undefined){
				noticia.curtido = [];
			}
			
			let found:string = noticia.curtido.find(curtiu => uidUsuarioLogado == curtiu)!;
			if(found != undefined && found != ""){
				alert("Você já curtiu esse item!");
				return;
			}else{
				const colecao = doc(FIREBASE_DB, 'Noticias', id);
				
				noticia.curtido.push(uidUsuarioLogado);
				await updateDoc(colecao, {
					titulo: noticia.titulo,
					tag: noticia.tag,
					dataDePublicacao: noticia.dataDePublicacao,
					texto: noticia.texto,
					tempoMedioLeitura: noticia.tempoMedioLeitura,
					imagem: noticia.imagem,
					criador: noticia.criador,
					uidCriador: noticia.uidCriador,
					curtido: noticia.curtido
				});
				alert("Curtido com sucesso!");
			}
        } catch (error) {
            alert("Falha ao Curtir! " + error)
        }
	}

	useEffect(() => {
		getData();
    }, []);

	return <Box alignItems="center" safeArea marginBottom={2}>
		<Box maxW="95%" style={styles.card} width={"95vw"}  overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
			borderColor: "coolGray.600",
			backgroundColor: "gray.700"
		}} _web={{
			shadow: 2,
			borderWidth: 0
		}} _light={{
			backgroundColor: "gray.50"
		}}>
			<Box>
				<Image style={styles.stretch} source={{ uri: noticia.imagem }} alt="image" />
				<Center bg="violet.500" _dark={{
					bg: "violet.400"
				}} _text={{
					color: "warmGray.50",
					fontWeight: "700",
					fontSize: "xs"
				}} position="absolute" bottom="0" px="3" py="1.5">
					{noticia.tag}
				</Center>
			</Box>
			<Stack p="4" space={3}>
				<Stack space={2}>
					<Heading size="md" ml="-1">
						{noticia.titulo}
					</Heading>
					<Text fontSize="xs" _light={{
						color: "violet.500"
					}} _dark={{
						color: "violet.400"
					}} fontWeight="500" ml="-0.5" mt="-1">
						{noticia.dataDePublicacao}
					</Text>
				</Stack>
				<Text fontWeight="400">
					{noticia.texto}
				</Text>
				<HStack alignItems="center" space={4} justifyContent="space-between">
					<HStack alignItems="center">
						<Text color="coolGray.600" _dark={{
							color: "warmGray.200"
						}} fontWeight="400">
							{noticia.tempoMedioLeitura}
						</Text>						
					</HStack>
				</HStack>
				{uidUsuarioLogado == noticia.uidCriador && 
					<HStack alignItems="center" space={4} justifyContent="space-around">						
						<Button width={"30vw"} colorScheme="secondary" onPress={ () => excluir(id)}>Excluir</Button>
						<Button width={"30vw"} onPress={ () => alterar(id)}>Editar</Button>
					</HStack>
				}
				{uidUsuarioLogado != noticia.uidCriador && 
					<HStack alignItems="center" space={4} justifyContent="space-around">						
						<Button width={"30vw"} colorScheme="secondary" onPress={ () => curtir(id)}>{"Curtir " + noticia.curtido.length.toString() }</Button>
					</HStack>
				}
			</Stack>
		</Box>
	</Box>;
}

const styles = StyleSheet.create({
	stretch: {
		height: "60vh",
		width: "95vw",
		resizeMode: 'cover',
		borderRadius: 15,
	},
	card:{
		borderRadius: 15,
	}
});