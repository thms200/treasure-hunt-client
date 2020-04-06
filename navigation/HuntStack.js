import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GetTreasureList from '../screens/GetTreasureList';
import GetTreasureDetail from '../screens/GetTreasureDetail';

const HuntStack = createStackNavigator();

export default function Hunt() {
  return (
    <HuntStack.Navigator>
      <HuntStack.Screen name="GetTreasureList" component={GetTreasureList} options={{ headerShown: false }} />
      <HuntStack.Screen name="GetTreasureDetail" component={GetTreasureDetail} />
    </HuntStack.Navigator>
  );
}