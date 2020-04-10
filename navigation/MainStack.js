import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HuntStack from '../navigation/HuntStack';
import HideStack from '../navigation/HideStack';

const MainStack = createStackNavigator();

export default function Main() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Hunt" component={HuntStack} options={{ headerShown: false }} />
      <MainStack.Screen name="Hide" component={HideStack} options={{ headerShown: false }} />
    </MainStack.Navigator>
  );
}
