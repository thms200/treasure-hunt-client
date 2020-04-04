import React, { useState, Fragment } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import message from './constants/message';

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="hiding"
        onPress={() => navigation.navigate('SelectTreasureCategory')}
      />
      <Button
        title="hunting"
        onPress={() => navigation.navigate('GetTreasureList')}
      />
    </View>
  );
}

function SelectTreasureCategory({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="유심"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '유심',
        })}
      />
      <Button
        title="교통"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '교통',
        })}
      />
      <Button
        title="영화/공연"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '영화/공연',
        })}
      />
      <Button
        title="입장권"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '입장권',
        })}
      />
      <Button
        title="쿠폰"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '쿠폰',
        })}
      />
      <Button
        title="기타"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '기타',
        })}
      />
    </View>
  );
}

function InputTreasureDetail({ route }) {
  const { category } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{category}</Text>
    </View>
  );
}

function GetTreasureList({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="영국 교통 패스"
        onPress={() => navigation.navigate('GetTreasureDetail', {
          id: '영국 교통 패스 DB id',
        })}
      />
      <Button
        title="프랑스 유심"
        onPress={() => navigation.navigate('GetTreasureDetail', {
          id: '프랑스 유심 DB id',
        })}
      />
      <Button
        title="Hiding"
        onPress={() => navigation.navigate('SelectTreasureCategory')}
      />
    </View>
  );
}

function GetTreasureDetail({ route }) {
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
    </View>
  );
}

function LoginScreen() {
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
          //로그인 완료 후 화면 전환을 위한 정보 업데이트 단계 필요
          //Facebook app id, api url 환경 변수로 저장 필요
        }
      });
    } catch (err) {
      alert(message.invalidLogin);
      console.log(err);
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

const RootStack = createStackNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(null);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {userToken === null
          ? <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}
            />
          : (
            <Fragment>
              <RootStack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
              <RootStack.Screen 
                name="SelectTreasureCategory"
                component={SelectTreasureCategory}
                options={({ navigation }) => ({
                  headerTitle: 'Select category',
                  headerRight: () => (
                    <Button
                      title="finding"
                      onPress={() => navigation.navigate('GetTreasureList')}
                    />
                  ),
                })}
              />
              <RootStack.Screen
                name="InputTreasureDetail"
                component={InputTreasureDetail}
                options={({ navigation }) => ({
                  headerTitle: 'Select category',
                  headerRight: () => (
                    <Button
                      title="finding"
                      onPress={() => navigation.navigate('GetTreasureList')}
                    />
                  ),
                })}
              />
              <RootStack.Screen name="GetTreasureList" component={GetTreasureList} options={{ headerShown: false }} />
              <RootStack.Screen name="GetTreasureDetail" component={GetTreasureDetail} />
            </Fragment>
          )}
      </RootStack.Navigator>
    </NavigationContainer>
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
