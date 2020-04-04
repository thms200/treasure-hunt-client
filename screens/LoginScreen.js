import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import message from '../constants/message';
import getEnvVars from '../environment';
const { FACEBOOK_APP_ID, API_URL } = getEnvVars();

export default function LoginScreen({ navigation }) {
  useEffect(() => {
    const checkLogin = async () => {
      const currentToken = await SecureStore.getItemAsync('userToken');
      if (currentToken) return navigation.navigate('Main', { screen: 'Home'})
    }
    checkLogin();
  }, []);

  const logInFacebook = async () => {
    try {
      await Facebook.initializeAsync(FACEBOOK_APP_ID);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['email'],
      });
      if (type !== 'success') return alert(message.invalidLogin);
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture`);
      const userInfo = await response.json();
      const { email, name } = userInfo;
      const picture_url = userInfo.picture.data.url;
      const payload = JSON.stringify({ email, name, picture_url });
      return await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      })
      .then((res) => res.json())
      .then(async (json) => {
        if (json.result === 'ng') return alert(message.invalidLogin); 
        if (json.result === 'ok') {
          await SecureStore.setItemAsync('userToken', json.token);
          navigation.navigate('Main', { screen: 'Home'})
        }
      });
    } catch (err) {
      alert(message.invalidLogin);
      console.warn(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Treasure Hunt</Text>
      <Button
        title="login"
        onPress={() => logInFacebook()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
