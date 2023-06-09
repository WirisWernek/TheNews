import React, { useEffect, useState } from "react";
import { Box, Heading, NativeBaseProvider } from "native-base";
import { Card } from '../components/Card/Card';
import { FlatList, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageService from "../services/storage";

function Home({ navigation }: any) {
	const [noticia, setNoticia] = useState('');
    const [noticias, setNoticias] = useState<any[]>([]);
	const [criador, setCriador] = useState('');
	const [uidCriador, setUidCriador] = useState('');
	const service = new StorageService(); 

	const getData = async () => {
		try {
			let nomeVar = await service.getData("nome");
			let uidVar = await service.getData("uid");
	
			setCriador(nomeVar!.toString());
			setUidCriador(uidVar!.toString());
		} catch (e) {
			console.log(e)
		}
	  };

	useEffect(() => {
        const NoticiasRef = collection(FIREBASE_DB, 'Noticias');
		getData();
        const subscriber = onSnapshot(NoticiasRef, {
            next: (snapshot) => {
                const noticias: any[] = [];
                snapshot.docs.forEach(doc => {
                    noticias.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
                setNoticias(noticias);
            }
        })
        return () => subscriber();
    }, []);

	return (
		<NativeBaseProvider >
			<Box flex={1} style={styles.box} safeArea alignItems="center">
				<Heading>{criador.trim() != '' ? "Novidades para " + criador.split(' ')[0] : "Olá Visitante" }</Heading>
				<FlatList
				data={noticias}
				renderItem={({ item }) => (
					<Card noticia={item} id={item.id} navigation={navigation}/>
				)}
				/>
			</Box>
		</NativeBaseProvider>	
	);
}

const styles = StyleSheet.create({
	box:{
		marginBottom: "10vh"
	},
});

export default Home;