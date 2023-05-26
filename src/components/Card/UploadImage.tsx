import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FIREBASE_STORAGE } from "../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


export default function UploadFoto() {
  const [image, setImage] = useState<any>({});

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const base64 = await convertImageToBase64(result.uri);
      setImage({ uri: result.uri, base64 });
    }
  };

  async function convertImageToBase64(uri: any) {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const salvarImagem = async () => {
    try {
      const storageRef = ref(
        FIREBASE_STORAGE,
        "images/" + new Date().getTime()
      );
      const response = await fetch(image);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(storageRef);

	  alert(imageUrl);
      // const docData = {
      // titulo: titulo,
      // descricao: descricao,
      // imageUrl: imageUrl,
      // dataCriacao: dataFormatada(),
      // };

      // const docRef = await addDoc(collection(FIRESTORE_DB, 'Noticias'), docData);
    } catch (error) {
      alert("Erro ao subir imagem" + error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image.uri && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
	 <Button title="Salvar" onPress={salvarImagem} />
    </View>
  );
}
