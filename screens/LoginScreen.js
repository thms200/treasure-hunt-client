import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { checkLogin, logInFacebook } from '../utils/api';
import { COLOR, FONT } from '../constants/';

export default function LoginScreen({ navigation }) {
  useEffect(() => {
    checkLogin(navigation);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Treasure</Text>
        <Text style={styles.title}>Hunt</Text>
      </View>
      <View style={styles.loginConatiner}>
        <FontAwesome.Button
          name="facebook"
          backgroundColor="#3b5998"
          onPress={() => logInFacebook(navigation)}
        >
          <Text style={styles.login}>Login with Facebook</Text>
        </FontAwesome.Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BLUE,
  },
  titleContainer: {
    flex: 1,
    marginTop: 150,
  },
  title: {
    marginRight: 15,
    textAlign: 'center',
    fontSize: 50,
    color: COLOR.WHITE,
    fontFamily: FONT.RIGHT,
  },
  loginConatiner: {
    marginBottom: 100
  },
  login: {
    fontSize: 20,
    color: COLOR.WHITE,
    fontFamily: FONT.RIGHT,
  }
});
