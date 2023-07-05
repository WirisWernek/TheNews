import React, { useLayoutEffect, useState } from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, FlatList, Button, View } from "native-base";
import { GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageService from "../services/storage";


export default function Login() {
	const [user, setUser] = useState();
	const auth = getAuth();
	const service = new StorageService();
	
	const loginGoogle = async () => {
		var provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider).then((result) => {
			var credential = GoogleAuthProvider.credentialFromResult(result);
			var token = credential?.accessToken;
			setUser(result.user!);
			service.storeData("nome",result.user.displayName!);
			service.storeData( "uid", result.user.uid!);
		}).catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.customData.email;
			var credential = GoogleAuthProvider.credentialFromError(error);
		});
		 
	}

	const logoutGoogle = () =>{
		setUser(undefined);
		service.storeData("nome","");
		service.storeData( "uid", "");
	}

  return (
    <NativeBaseProvider>
      <Box safeArea alignItems="center">
        <Heading>Perfil</Heading>
		{user == undefined && <Button onPress={loginGoogle}>Login com Google</Button>}
	  	{user != null && 
			<View style={styles.profile}>
				<Image style={styles.stretch} source={{ uri: user?.photoURL }} alt="image" />
				<Text>Nome: {user?.displayName}</Text>
				<Text>Email: {user?.email}</Text>
				<Text>ID: {user?.uid}</Text>
				<Button onPress={logoutGoogle}>Logout</Button>
			</View>
		}
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
	stretch: {
		height: "12vh",
		width: "12vh",
		resizeMode: 'cover',
		borderRadius: 15,
	},
	profile:{
		justifyContent:"center",
		alignItems: "center"
	},
	card:{
		borderRadius: 15,
	}
});