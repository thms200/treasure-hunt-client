import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectCategoryScreen from '../screens/SelectCategoryScreen';
import InputDetailScreen from '../screens/InputDetailScreen';
import TakePictureScreen from '../screens/TakePictureScreen';
import ShowMapScreen from '../screens/ShowMapScreen';
import { COLOR, FONT } from '../constants';

const HideStack = createStackNavigator();

export default function Hide() {
  return (
    <HideStack.Navigator>
      <HideStack.Screen
        name="SelectCategory"
        component={SelectCategoryScreen}
        options={({ navigation }) => ({
          headerTitle: 'Select Category',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Hunt', { screen: 'Treasures' })}
            >
              <Text style={styles.headerRight}>Hunting</Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        })}
      />
      <HideStack.Screen
        name="InputDetail"
        component={InputDetailScreen}
        options={({ navigation }) => ({
          headerTitle: 'Happy Hiding 🎁',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Hunt', { screen: 'Treasures' })}
            >
              <Text style={styles.headerRight}>Hunting</Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        })}
      />
      <HideStack.Screen
        name="TakePicture"
        component={TakePictureScreen}
        options={{ headerShown: false }}
      />
      <HideStack.Screen
        name="ShowMap"
        component={ShowMapScreen}
        options={{ headerShown: false }}
      />
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
