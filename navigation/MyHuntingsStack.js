import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MyHuntingsContainer from '../containers/MyPageContainer';
import MyHuntingDetailContainer from '../containers/MyPageDetailContainer';
import { COLOR, FONT } from '../constants';

const MyHuntingsStack  = createStackNavigator();

export default function MyTreasures() {
  const headerOption = {
    headerTitle: 'My Huntings',
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
  };

  return (
    <MyHuntingsStack.Navigator>
      <MyHuntingsStack.Screen
        name="MyHuntings"
        options={headerOption}
      >
        {props => <MyHuntingsContainer {...props} type={'hunting'} />}
      </MyHuntingsStack.Screen>
      <MyHuntingsStack.Screen
        name="MyHuntingDetail"
        options={headerOption}
      >
        {props => <MyHuntingDetailContainer {...props} type={'hunting'} />}
      </MyHuntingsStack.Screen>
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
