import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { COLOR } from '../constants';
import message from '../constants/message';

export default function InputTreasureDetail({ navigation, route }) {
  const [hasPermissionCamera, setHasPermissionCamara] = useState(false);
  const [hasPermissionGallery, setHasPermissionGallery] = useState(false);
  const [uriList, setUriList] = useState([]);

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

  useEffect(() => {
    const { uri } = route.params;
    if (uri && uriList.length <= 3 && !uriList.includes(uri)) {
      setUriList((uriList) => uriList.concat(uri));
    }
  });

  const onGetPictures = async() => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) return;
    const { uri } = pickerResult;
    if (uri && uriList.length <= 3 && !uriList.includes(uri)) {
      setUriList((uriList) => uriList.concat(uri));
    }
  };

  const { category } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{category}</Text>
      <TouchableOpacity
        style={{ margin: 10, padding: 10, backgroundColor: COLOR.BLUE }}
        onPress={() => {
          if (uriList.length >= 3) return alert(message.maxImg);
          if (hasPermissionCamera && hasPermissionGallery) {
            return navigation.navigate('Main', { screen: 'TakeAPicture' });
          }
          alert(message.deniedPermission);
        }}
      >
        <Text style={{ color: COLOR.WHITE }}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ margin: 10, padding: 10, backgroundColor: COLOR.BLUE }}
        onPress={() => {
          if (uriList.length >= 3) return alert(message.maxImg);
          if (hasPermissionCamera && hasPermissionGallery) return onGetPictures();
          alert(message.deniedPermission);
        }}
      >
        <Text style={{ color: COLOR.WHITE }}>Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ margin: 10, padding: 10, backgroundColor: COLOR.BLUE }}
      >
        <Text style={{ color: COLOR.WHITE }}>Map</Text>
      </TouchableOpacity>
      {uriList.map((uri, index) => {
        return (
          <View key={index}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri }}
            />
          </View>
        );
      })}
    </View>
  );
}
