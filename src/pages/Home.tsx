import React, { useEffect, useState } from "react";
import { Box, Heading, NativeBaseProvider } from "native-base";
import { Card } from '../components/Card/Card';
import { FlatList, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";

function Home() {
	const [noticia, setNoticia] = useState('');
    const [noticias, setNoticias] = useState<any[]>([]);

	useEffect(() => {
        const NoticiasRef = collection(FIREBASE_DB, 'Noticias');

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
				<Heading>Notícias</Heading>
				<FlatList
				data={noticias}
				renderItem={({ item }) => (
					<Card noticia={item} />
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