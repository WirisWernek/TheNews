import * as React from 'react';
import {
	Box,
	Heading,
	Text,
	Center,
	HStack,
	Stack,
} from 'native-base';
import Noticia from '../../models/Noticia';
import { Image, StyleSheet } from 'react-native';

type Props = {
	noticia: Noticia,
};

export function Card({ noticia }: Props) {
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