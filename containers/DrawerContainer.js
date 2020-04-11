import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { getLogoutUser } from '../actions';
import { COLOR, FONT } from '../constants';


export default function Drawer(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);
  const userInfo = useSelector(state => state.user.userInfo);

  if(!isLogin) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Welcome :)"
          icon={() => <Entypo size={30} name={'flower'} color={COLOR.BLUE}/>}
          onPress={() => alert('Please Login :) ')}
          labelStyle={styles.logout}
        />
      </DrawerContentScrollView>
    );
  } else  {
    return (
      <View style={styles.wrapper}>
        <View style={styles.userWrpper}>
          <Text style={styles.userText}>{userInfo.name}</Text>
          <Image source={{ uri: userInfo.picture }} style={styles.userPicture}/>
        </View>
        <View style={styles.drawerWrapper}>
          <DrawerContentScrollView {...props}>
            <DrawerItem
              label="Home"
              icon={() => <AntDesign size={30} name={'home'} />}
              onPress={() => navigation.navigate('Hunt', { screen: 'Treasures' })}
              labelStyle={styles.drawerText}
            />
            <DrawerItem
              label="My Huntings"
              icon={() => <AntDesign size={30} name={'shoppingcart'} />}
              onPress={() => navigation.navigate('My Huntings', { screen: 'MyHuntings' })}
              labelStyle={styles.drawerText}
            />
            <DrawerItem
              label="My Treasures"
              icon={() => <MaterialCommunityIcons size={30} name={'treasure-chest'} />}
              onPress={() => navigation.navigate('My Treasures', { screen: 'MyTreasures' })}
              labelStyle={styles.drawerText}
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
              labelStyle={styles.drawerText}
            />
          </DrawerContentScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logout: {
    fontFamily: FONT.GAMJA,
    fontSize: 25,
    color: COLOR.BLUE,
  },
  wrapper: {
    flex: 1
  },
  userWrpper: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.BLUE
  },
  userPicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userText: {
    color: COLOR.WHITE,
    fontSize: 30,
    fontFamily: FONT.GAMJA,
  },
  drawerWrapper: {
    flex: 8,
  },
  drawerText: {
    fontFamily: FONT.GAMJA,
    fontSize: 25
  },
});
