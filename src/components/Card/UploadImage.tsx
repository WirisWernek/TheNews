import React, { useState, } from "react";
import { Button, Icon, } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FIREBASE_STORAGE } from "../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

type Props = {
	defineImage: (t: string) => void;
};

export default function UploadFoto({ defineImage }: Props) {


	const pickImage = async () => {

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: false,
		});
		if (!result.canceled) {
			let image = result.assets[0].uri;
			await salvarImagem(image);
		}
	};

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
			await defineImage(imageUrl.toString());
		} catch (error) {
			console.log(error);
			alert("Erro ao subir imagem \n" + error);
		}
	};

	return (
		<Button leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />} onPress={pickImage}>
			Upload Image
		</Button>

	);
}
