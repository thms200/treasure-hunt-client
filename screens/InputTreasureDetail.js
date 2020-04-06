import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { COLOR } from '../constants';
import message from '../constants/message';
import getEnvVars from '../environment';
const { API_URL } = getEnvVars();

export default function InputTreasureDetail({ navigation, route }) {
  const [hasPermissionCamera, setHasPermissionCamara] = useState(false);
  const [hasPermissionGallery, setHasPermissionGallery] = useState(false);
  const [uriList, setUriList] = useState([]);
  const { category } = route.params;

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

  const onSaveTreasure = async() => {
    try {
      const formdata = new FormData();
      uriList.forEach(uri => {
        const name = uri.split('Camera/')[1] || uri.split('ImagePicker/')[1];
        const locationPicture = { uri, name, type: 'multipart/form-data', };
        formdata.append('img', locationPicture);
      });
      formdata.append('category', category);
      formdata.append('country', 'france');
      formdata.append('location', 37.505978);

      const userToken = await SecureStore.getItemAsync('userToken');
      return await fetch(`${API_URL}/api/treasures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': `Bearer ${userToken}`,
        },
        body: formdata,
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.result === 'ok') {
            alert(message.successSave);
            return navigation.navigate('GetTreasureList');
          }
          if (json.result === 'ng') return alert(message.failSave);
        });
    } catch(err) {
      alert(message.failSave);
      console.warn(err);
    }
  };

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
      <TouchableOpacity
        style={{ margin: 10, padding: 10 }}
        onPress={() => onSaveTreasure()}
      >
        <Text style={{ color: COLOR.BLUE }}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
}
