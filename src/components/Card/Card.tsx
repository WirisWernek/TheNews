import * as React from 'react';
import Constants from 'expo-constants';
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
} from 'native-base';

type Props = {
	tag: string,
	titulo: string,
	dataDePublicacao: string,
	texto: string,
	tempoMedioLeitura: string,
	imagem: string,
};

export function Card({ tag, titulo, dataDePublicacao, texto, tempoMedioLeitura, imagem }: Props) {
	return <Box alignItems="center" safeArea>
		<Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
			borderColor: "coolGray.600",
			backgroundColor: "gray.700"
		}} _web={{
			shadow: 2,
			borderWidth: 0
		}} _light={{
			backgroundColor: "gray.50"
		}}>
			<Box>
				<AspectRatio w="100%" ratio={16 / 9}>
					<Image source={{
						uri: imagem
					}} alt="image" />
				</AspectRatio>
				<Center bg="violet.500" _dark={{
					bg: "violet.400"
				}} _text={{
					color: "warmGray.50",
					fontWeight: "700",
					fontSize: "xs"
				}} position="absolute" bottom="0" px="3" py="1.5">
					{tag}
				</Center>
			</Box>
			<Stack p="4" space={3}>
				<Stack space={2}>
					<Heading size="md" ml="-1">
						{titulo}
					</Heading>
					<Text fontSize="xs" _light={{
						color: "violet.500"
					}} _dark={{
						color: "violet.400"
					}} fontWeight="500" ml="-0.5" mt="-1">
						{dataDePublicacao}
					</Text>
				</Stack>
				<Text fontWeight="400">
					{texto}
				</Text>
				<HStack alignItems="center" space={4} justifyContent="space-between">
					<HStack alignItems="center">
						<Text color="coolGray.600" _dark={{
							color: "warmGray.200"
						}} fontWeight="400">
							{tempoMedioLeitura}
						</Text>
					</HStack>
				</HStack>
			</Stack>
		</Box>
	</Box>;
}

