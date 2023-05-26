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
} from "native-base";

function NewNews() {
  return (
    <NativeBaseProvider>
      <Box safeArea alignItems="center">
        <Heading>Nova Notícia</Heading>
		
      </Box>
    </NativeBaseProvider>
  );
}

export default NewNews;
