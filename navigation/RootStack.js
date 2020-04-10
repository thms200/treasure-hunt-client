import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStack';
import LoginContainer from '../containers/LoginContainer';

const RootStack = createStackNavigator();

export default function Root() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Login" component={LoginContainer} options={{ headerShown: false }} />
      <RootStack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}
