import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyHuntingsScreen from '../screens/MyHuntingsScreen';
import MyHuntingDetailScreen from '../screens/MyHuntingDetailScreen';

const MyHuntingsStack  = createStackNavigator();

export default function MyTreasures() {
  return (
    <MyHuntingsStack.Navigator>
      <MyHuntingsStack.Screen name="MyHuntings" component={MyHuntingsScreen} />
      <MyHuntingsStack.Screen name="MyHuntingDetail" component={MyHuntingDetailScreen} />
    </MyHuntingsStack.Navigator>
  );
}
