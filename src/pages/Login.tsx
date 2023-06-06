import React, { useLayoutEffect, useState, useEffect } from "react";
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
import Google from "expo-auth-session/providers/google";
import WebBrowser from "expo-web-browser";
import { View, TouchableOpacity } from "react-native";
import { fetchUserInfoAsync } from "expo-auth-session";
import AsyncStorage
 from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

function Login() {
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "394956090155-vphfgeo0gqqsa1j5sdut7s5fe62109ql.apps.googleusercontent.com",
    iosClientId: "394956090155-94p1ntj55615hlimn2lih85m2m5uuu5b.apps.googleusercontent.com"
  });

  async function fetchUserInfo(){
    let response = await fetch("https://www.googleapi.com/userinfo/v2/me", {
      headers:{
        Authorization: `Bearer ${accessToken}`,
      }
    })
  }

  const user = await response?.json();
  setUserInfo(user);

  useEffect(() => {
    if(response?.type === "success"){
      setAccessToken(response?.authentication?.accessToken);
      accessToken && fetchUserInfo();
    }
  },[response, accessToken]);

  function showUserInfo(){
    if(userInfo){
      return(
        <View>
          <Text>{userInfo.name}</Text>
        </View>
      );
    }
  }

  return (
    <NativeBaseProvider>
      <Box safeArea alignItems="center">
        <Heading>Perfil</Heading>
        {userInfo && <showUserInfo/> }
        {userInfo === null && 
          <>
          <TouchableOpacity disabled={!request} onPress={()=>promptAsync}>
            <Text>Clique aqui</Text>
          </TouchableOpacity>
          </>
        }
      </Box>
    </NativeBaseProvider>
  );
}

export default Login;
