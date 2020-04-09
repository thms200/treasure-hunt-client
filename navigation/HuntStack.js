import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HuntContainer from '../containers/HuntContainer';
import GetTreasureDetail from '../screens/GetTreasureDetail';

const HuntStack = createStackNavigator();

export default function Hunt() {
  return (
    <HuntStack.Navigator>
      <HuntStack.Screen name="GetTreasureList" component={HuntContainer} options={{ headerShown: false }} />
      <HuntStack.Screen name="GetTreasureDetail" component={GetTreasureDetail} />
    </HuntStack.Navigator>
  );
}
