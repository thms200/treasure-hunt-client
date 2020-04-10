import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyTreasuresScreen from '../screens/MyTreasuresScreen';
import MyTreasureDetailScreen from '../screens/MyTreasureDetailScreen';

const MyTreasuresStack  = createStackNavigator();

export default function MyTreasures() {
  return (
    <MyTreasuresStack.Navigator>
      <MyTreasuresStack.Screen name="MyTreasures" component={MyTreasuresScreen} />
      <MyTreasuresStack.Screen name="MyTreasureDetail" component={MyTreasureDetailScreen} />
    </MyTreasuresStack.Navigator>
  );
}
