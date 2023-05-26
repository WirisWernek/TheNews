import React, { useLayoutEffect, useState } from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, FlatList } from "native-base";

function Login() {
  return (
    <NativeBaseProvider>
      <Box safeArea alignItems="center">
        <Heading>Perfil</Heading>
      </Box>
    </NativeBaseProvider>
  );
}

export default Login;
