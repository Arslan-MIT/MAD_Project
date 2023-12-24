import { View, Text, TextInput, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../Shared/Colors'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';
export default function Login() {
  WebBrowser.maybeCompleteAuthSession();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const { userData, setUserData } = useContext(AuthContext)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '229868421275-gc7u8mnspkejcs6djr0n9tfsi48bu8ol.apps.googleusercontent.com',
    expoClientId: '229868421275-i91f7ck00hkkhkvnaaajnvn2k1u142b8.apps.googleusercontent.com'
    // androidClientId: '55959786226-e9frfu2d60hu3lt653blch82e4rhjsnp.apps.googleusercontent.com',
    // expoClientId:'55959786226-llk648p590tvtaoklnv4o89mtjtenecr.apps.googleusercontent.com'

  });

  useEffect(() => {
    if (response?.type == 'success') {
      setAccessToken(response.authentication.accessToken);

      getUserData();
    }
  }, [response]);

  const getUserData = async () => {
    try {
      const resp = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
        }
      );

      const user = await resp.json();
      console.log("user Details", user)
      setUserInfo(user);
      setUserData(user);
      await Services.setUserAuth(user);
    } catch (error) {
      // Add your own error handler here
    }
  }
  return (
    <View>
      <Image source={require('./../Assets/Images/login.png')} />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to MAD Learning</Text>
        <TouchableOpacity style={styles.button1}
          onPress={() => promptAsync()}>
          <Ionicons name="logo-google" size={24}
            color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: Colors.white }}>Sign In with Google</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginBottom: 12, fontWeight: 'bold' }}>OR</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => setUserData({
          name: 'MAD_students',
          picture: 'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp',
          email: 'arslan',
          id: 0
        })}>
          <AntDesign name="login" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: Colors.white }}>Login</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: -10 }}>Don't have an account? <Text style={{ color: Colors.primary }}>Sign Up</Text></Text>

        <TouchableOpacity onPress={() => setUserData({
          name: 'Arslan',
          picture: 'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp',
          email: 'SP20-BSE-087@cuilahore.edu.pk',
          id: 0
        })}>
          <Text style={styles.guestText} >Try as Guest</Text>
        </TouchableOpacity>

      </View>
      <Image style={styles.Image} source={require('./../Assets/Images/API.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginTop: -25,
    height: '55%',
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  Image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: -16,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  welcomeText: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: -10,
  },

  button1: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 10,
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '60%',
    alignSelf: 'center'
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignSelf: 'center'
  },
  guestText: {
    textAlign: 'right',
    paddingRight: 15,
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.primary
  }
})