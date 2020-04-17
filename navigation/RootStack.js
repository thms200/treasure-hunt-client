import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import HuntStack from '../navigation/HuntStack';
import HideStack from '../navigation/HideStack';
import LoginContainer from '../containers/LoginContainer';

const RootStack = createStackNavigator();

export default function Root() {
  const isLogin = useSelector(state => state.user.isLogin);

  if(!isLogin) {
    return <LoginContainer options={{ headerShown: false }} />;
  } else {
    return (
      <RootStack.Navigator>
        <RootStack.Screen name="Hunt" component={HuntStack} options={{ headerShown: false }} />
        <RootStack.Screen name="Hide" component={HideStack} options={{ headerShown: false }} />
      </RootStack.Navigator>
    );
  }
}
