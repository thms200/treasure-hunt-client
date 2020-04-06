import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SelectTreasureCategory from '../screens/SelectTreasureCategory';
import InputTreasureDetail from '../screens/InputTreasureDetail';
import GetTreasureList from '../screens/GetTreasureList';
import GetTreasureDetail from '../screens/GetTreasureDetail';
import TakeAPicure from '../screens/TakeAPicture';
import { COLOR } from '../constants';

const MainStack = createStackNavigator();

export default function Main() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <MainStack.Screen
        name="SelectTreasureCategory"
        component={SelectTreasureCategory}
        options={({ navigation }) => ({
          headerTitle: 'Select Category',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('GetTreasureList')}
            >
              <Text style={{ marginRight: 10, color: COLOR.BLUE, fontWeight: 'bold' }}>Hunting</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <MainStack.Screen
        name="InputTreasureDetail"
        component={InputTreasureDetail}
        options={({ navigation }) => ({
          headerTitle: 'Happy hiding',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('GetTreasureList')}
            >
              <Text style={{ marginRight: 10, color: COLOR.BLUE, fontWeight: 'bold' }}>Hunting</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <MainStack.Screen name="GetTreasureList" component={GetTreasureList} options={{ headerShown: false }} />
      <MainStack.Screen name="GetTreasureDetail" component={GetTreasureDetail} />
      <MainStack.Screen name="TakeAPicture" component={TakeAPicure} options={{ headerShown: false }} />
    </MainStack.Navigator>
  );
}
