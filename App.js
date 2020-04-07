import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Permissions from 'expo-permissions';
import MainStack from './navigation/MainStack';
import LoginScreen from './screens/LoginScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import message from './constants/message';

const getResorceAndPermission = async() => {
  await Font.loadAsync({
    'righteousRegular': require('./assets/fonts/Righteous-Regular.ttf'),
    'gamja': require('./assets/fonts/GamjaFlower-Regular.ttf'),
    'ptBold': require('./assets/fonts/PTSansNarrow-Bold.ttf'),
    'ptRegular': require('./assets/fonts/PTSansNarrow-Regular.ttf'),
  });

  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL,
    Permissions.LOCATION,
  );

  if (status !== 'granted') return alert(message.deniedPermission);
};

const RootStack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if(!isLoading) {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getResorceAndPermission}
        onFinish={() => setIsLoading(false)}
        onError={console.warn}
      />
    );
  }
}
