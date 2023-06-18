import React, { useLayoutEffect, useState } from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, FlatList, Button, View } from "native-base";
import { GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { StyleSheet } from "react-native";

export default function Login() {
	const [user, setUser] = useState();
	const auth = getAuth();
	
	const loginGoogle = () => {
		var provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var credential = GoogleAuthProvider.credentialFromResult(result);
			var token = credential.accessToken;
			// The signed-in user info.
			setUser(result.user);
			// IdP data available using getAdditionalUserInfo(result)
			// ...
			console.log(user?.providerData);
		}).catch((error) => {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.customData.email;
			// The AuthCredential type that was used.
			var credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
	}

	const logoutGoogle = () =>{
		setUser(undefined);
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