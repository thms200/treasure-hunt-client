import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStack';
import LoginScreen from '../screens/LoginScreen';

const RootStack = createStackNavigator();

export default function Root() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}
