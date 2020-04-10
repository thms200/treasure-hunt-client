import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContainer from './DrawerContainer';
import RootStack from '../navigation/RootStack';
import MyTreasuresStack from '../navigation/MyTreasuresStack';
import MyHuntingsStack from '../navigation/MyHuntingsStack';

const Drawer = createDrawerNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <DrawerContainer {...props} />}
      >
        <Drawer.Screen name="Home" component={RootStack} />
        <Drawer.Screen name="My Treasures" component={MyTreasuresStack} />
        <Drawer.Screen name="My Huntings" component={MyHuntingsStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
