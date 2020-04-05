import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './navigation/MainStack';
import LoginScreen from './screens/LoginScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const getFonts = async () => await Font.loadAsync({
  'righteousRegular': require('./assets/fonts/Righteous-Regular.ttf'),
  'gamja': require('./assets/fonts/GamjaFlower-Regular.ttf'),
  'pgBold': require('./assets/fonts/PTSansNarrow-Bold.ttf'),
  'pgRegular': require('./assets/fonts/PTSansNarrow-Regular.ttf'),
});

const RootStack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded) {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }
}
