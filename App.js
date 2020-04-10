import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import RootStack from './navigation/RootStack';
import MyTreasuresStack from './navigation/MyTreasuresStack';
import MyHuntingsStack from './navigation/MyHuntingsStack';
import treasures from './reducers/treasures';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import message from './constants/message';

const getResorceAndPermission = async() => {
  await Font.loadAsync({
    'righteousRegular': require('./assets/fonts/Righteous-Regular.ttf'),
    'gamja': require('./assets/fonts/GamjaFlower-Regular.ttf'),
    'ptBold': require('./assets/fonts/PTSansNarrow-Bold.ttf'),
    'ptRegular': require('./assets/fonts/PTSansNarrow-Regular.ttf'),
  });

  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL,
    Permissions.LOCATION,
  );

  if (status !== 'granted') return alert(message.deniedPermission);
};

const store = createStore(combineReducers({ treasures }));
const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if(!isLoading) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="RootStack">
            <Drawer.Screen name="Home" component={RootStack} />
            <Drawer.Screen name="My Treasures" component={MyTreasuresStack} />
            <Drawer.Screen name="My Hunting" component={MyHuntingsStack} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getResorceAndPermission}
        onFinish={() => setIsLoading(false)}
        onError={console.warn}
      />
    );
  }
}
