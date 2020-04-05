import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { COLOR } from '../constants';
import message from '../constants/message';

export default function InputTreasureDetail({ navigation, route }) {
  const [hasPermissionCamera, setHasPermissionCamara] = useState(false);
  const [hasPermissionGallery, setHasPermissionGallery] = useState(false);

  useEffect(() => {
    (async() => {
      const { status } = await Permissions.getAsync(Permissions.CAMERA);
      setHasPermissionCamara(status === 'granted');
    })();

    (async() => {
      const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      setHasPermissionGallery(status === 'granted');
    })();
  }, []);

  const { category } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{category}</Text>
      <TouchableOpacity
        style={{ margin: 10, padding: 10, backgroundColor: COLOR.BLUE }}
        onPress={() => {
          if (hasPermissionCamera) return navigation.navigate('Main', { screen: 'TakeAPicture' });
          alert(message.deniedPermission);
        }}
      >
        <Text style={{ color: COLOR.WHITE }}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ margin: 10, padding: 10, backgroundColor: COLOR.BLUE }}
      >
        <Text style={{ color: COLOR.WHITE }}>Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ margin: 10, padding: 10, backgroundColor: COLOR.BLUE }}
      >
        <Text style={{ color: COLOR.WHITE }}>Map</Text>
      </TouchableOpacity>
    </View>
  );
}
