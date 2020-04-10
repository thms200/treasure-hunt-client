import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { getLogoutUser } from '../actions';
import { COLOR, FONT } from '../constants';


export default function Drawer(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);

  if(!isLogin) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Welcome :)"
          icon={() => <Entypo size={30} name={'flower'} />}
          onPress={() => alert('Please Login :) ')}
          labelStyle={styles.logout}
        />
      </DrawerContentScrollView>
    );
  } else  {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          icon={() => <AntDesign size={30} name={'home'} />}
          onPress={() => navigation.navigate('Main', { screen: 'Treasures' })}
          labelStyle={styles.drawer}
        />
        <DrawerItem
          label="My Huntings"
          icon={() => <AntDesign size={30} name={'shoppingcart'} />}
          onPress={() => navigation.navigate('My Huntings', { screen: 'MyHuntings' })}
          labelStyle={styles.drawer}
        />
        <DrawerItem
          label="My Treasures"
          icon={() => <MaterialCommunityIcons size={30} name={'treasure-chest'} />}
          onPress={() => navigation.navigate('My Treasures', { screen: 'MyTreasures' })}
          labelStyle={styles.drawer}
        />
        <DrawerItem
          label="Logout"
          icon={() => <AntDesign size={30} name={'logout'} />}
          onPress={async() => {
            alert('Bye 👋');
            dispatch(getLogoutUser());
            await SecureStore.deleteItemAsync('userToken');
            navigation.navigate('Home', { screen: 'Login' });
          }}
          labelStyle={styles.drawer}
        />
      </DrawerContentScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logout: {
    fontFamily: FONT.GAMJA,
    fontSize: 25,
    color: COLOR.BLUE,
  },
  drawer: {
    fontFamily: FONT.GAMJA,
    fontSize: 25
  },
});
