import React, { useLayoutEffect, useState } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  FlatList,
  TextArea,
  Input,
} from "native-base";
import UploadFoto from "../components/Card/UploadImage";


function NewNews() {


  return (
    <NativeBaseProvider>
      <Box safeArea alignItems="center">
        <Heading>Nova Notícia</Heading>
		<Stack>
		 	<Input variant="outline" placeholder="Titulo" />
			<Input variant="outline" placeholder="Tag" />
			<TextArea h={20} placeholder="Texto" w="100%" maxW={500} autoCompleteType={undefined}/>
			<Input variant="outline" placeholder="Tempo Médio de Leitura" />
			<Input variant="outline" placeholder="Data de Publicação" />
			<UploadFoto/>
		 </Stack>
      </Box>
    </NativeBaseProvider>
  );
}

export default NewNews;
