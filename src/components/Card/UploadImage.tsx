import React, { useState, } from "react";
import { Button, Icon, } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";

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
			defineImage(image);
		}
	};

	return (
		<Button style={styles.buttonUploadImage} leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />} onPress={pickImage}>
			Upload da Imagem
		</Button>

	);
}


const styles = StyleSheet.create({

	buttonUploadImage:{
		backgroundColor: "#7BCBF9",
	}
});