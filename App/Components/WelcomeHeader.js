import { View, Button, Alert, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import Services from '../Shared/Services'

export default function WelcomeHeader() {

  const handleLogout = () => {
    // This function will be triggered when the image is pressed for logout confirmation
    Alert.alert(
      'Logout',
      'Thank you for using MAD. Are you sure you want to Logout?',
      [
        {
          text: 'No',
          onPress: () => console.log('Logout canceled'), // You can perform any action here on 'No' press
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            Services.Logout(); setUserData(null)
            console.log('Logout confirmed');
          },
        },
      ],
      {
        cancelable: true,
        // style: 'default',
        titleStyle: styles.alertTitle,
        messageStyle: styles.alertMessage,
      }
    );
  };

  const { userData, setUserData } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Welcome</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userData?.name}</Text>
      </View>
      {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome</Text> */}
      <TouchableOpacity onPress={handleLogout}>
        <Image source={{ uri: userData?.picture }}
          style={{ width: 40, height: 40, borderRadius: 100 }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    , marginTop: 15
  },
  alertTitle: {
    color: 'blue', // Change the color of the alert title
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertMessage: {
    color: 'black', // Change the color of the alert message
    fontSize: 16,
  },
})