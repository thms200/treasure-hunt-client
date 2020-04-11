import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MyHuntingsContainer from '../containers/MyPageContainer';
import MyHuntingDetailScreen from '../screens/MyHuntingDetailScreen';
import { COLOR, FONT } from '../constants';

const MyHuntingsStack  = createStackNavigator();

export default function MyTreasures() {
  return (
    <MyHuntingsStack.Navigator>
      <MyHuntingsStack.Screen
        name="myHuntings"
        options={{
          headerTitle: 'My Huntings',
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        }}
      >
        {props => <MyHuntingsContainer {...props} myPage={'hunting'} />}
      </MyHuntingsStack.Screen>
      <MyHuntingsStack.Screen name="My HuntingDetail" component={MyHuntingDetailScreen} />
    </MyHuntingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: FONT.PT_BOLD,
    fontSize: 30,
    color: COLOR.BLUE,
  }
});
