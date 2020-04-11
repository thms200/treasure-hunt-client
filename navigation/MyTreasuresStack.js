import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTreasuresContainer from '../containers/MyPageContainer';
import MyTreasureDetailScreen from '../screens/MyTreasureDetailScreen';
import { COLOR, FONT } from '../constants';

const MyTreasuresStack  = createStackNavigator();

export default function MyTreasures() {
  return (
    <MyTreasuresStack.Navigator>
      <MyTreasuresStack.Screen
        name="myTreasures"
        options={{
          headerTitle: 'My Treasures',
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        }}
      >
        {props => <MyTreasuresContainer {...props} myPage={'treasure'} />}
      </MyTreasuresStack.Screen>
      <MyTreasuresStack.Screen name="My TreasureDetail" component={MyTreasureDetailScreen} />
    </MyTreasuresStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: FONT.PT_BOLD,
    fontSize: 30,
    color: COLOR.BLUE,
  }
});
