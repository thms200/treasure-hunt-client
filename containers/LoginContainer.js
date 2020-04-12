import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { checkLogin, logInFacebook } from '../utils/api';
import { getLoginUser } from '../actions';
import { COLOR, FONT } from '../constants';

export default function LoginContainer() {
  const dispatch = useDispatch();
  useEffect(() => {
    checkLogin(dispatch, getLoginUser);
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
          onPress={() => logInFacebook(dispatch, getLoginUser)}
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
