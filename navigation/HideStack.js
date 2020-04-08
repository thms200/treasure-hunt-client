import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectTreasureCategory from '../screens/SelectTreasureCategory';
import InputTreasureDetail from '../screens/InputTreasureDetail';
import TakeAPicure from '../screens/TakeAPicture';
import ShowMap from '../screens/ShowMap';
import { COLOR, FONT } from '../constants';

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
              <Text style={styles.headerRight}>Hunting</Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        })}
      />
      <HideStack.Screen
        name="InputTreasureDetail"
        component={InputTreasureDetail}
        options={({ navigation }) => ({
          headerTitle: 'Happy Hiding 🎁',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Hunt', { screen: 'GetTreasureList' })}
            >
              <Text style={styles.headerRight}>Hunting</Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        })}
      />
      <HideStack.Screen name="TakeAPicture" component={TakeAPicure} options={{ headerShown: false }} />
      <HideStack.Screen name="ShowMap" component={ShowMap} options={{ headerShown: false }} />
    </HideStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 10,
    color: COLOR.GREY,
    fontFamily: FONT.PT_REGUL,
  },
  headerTitle: {
    fontFamily: FONT.PT_BOLD,
    fontSize: 30,
    color: COLOR.BLUE,
  }
});
