import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectTreasureCategory from '../screens/SelectTreasureCategory';
import InputTreasureDetail from '../screens/InputTreasureDetail';
import TakeAPicure from '../screens/TakeAPicture';
import ShowMap from '../screens/ShowMap';
import { COLOR } from '../constants';

const HideStack = createStackNavigator();

export default function Hide() {
  return (
    <HideStack.Navigator>
      <HideStack.Screen
        name="SelectTreasureCategory"
        component={SelectTreasureCategory}
        options={({ navigation }) => ({
          headerTitle: 'Select Category',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Hunt', { screen: 'GetTreasureList' })}
            >
              <Text style={{ marginRight: 10, color: COLOR.BLUE, fontWeight: 'bold' }}>Hunting</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <HideStack.Screen
        name="InputTreasureDetail"
        component={InputTreasureDetail}
        options={({ navigation }) => ({
          headerTitle: 'Happy hiding',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Hunt', { screen: 'GetTreasureList' })}
            >
              <Text style={{ marginRight: 10, color: COLOR.BLUE, fontWeight: 'bold' }}>Hunting</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <HideStack.Screen name="TakeAPicture" component={TakeAPicure} options={{ headerShown: false }} />
      <HideStack.Screen name="ShowMap" component={ShowMap} options={{ headerShown: false }} />
    </HideStack.Navigator>
  );
}
