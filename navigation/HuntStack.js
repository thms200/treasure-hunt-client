import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TreasuresContainer from '../containers/TreasuresContainer';
import TreasureDetailContainer from '../containers/TreasureDetailContainer';
import { COLOR, FONT } from '../constants';

const HuntStack = createStackNavigator();

export default function Hunt() {
  return (
    <HuntStack.Navigator>
      <HuntStack.Screen
        name="GetTreasureList"
        component={TreasuresContainer}
        options={({ navigation }) => ({
          headerTitle: 'Happy Hunting 👀',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Hide', { screen: 'SelectTreasureCategory' })}
            >
              <Text style={styles.headerRight}>Hiding</Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        })}
      />
      <HuntStack.Screen name="GetTreasureDetail" component={TreasureDetailContainer} />
    </HuntStack.Navigator>
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
