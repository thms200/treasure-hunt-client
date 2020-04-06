import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import { COLOR } from '../constants';
import message from '../constants/message';
import { caculateDelta } from '../utils';
import getEnvVars from '../environment';
const { API_URL } = getEnvVars();

export default function InputTreasureDetail({ navigation, route }) {
  const [hasPermissionCameraAndAlbum, setHasPermissionCamaraAndAlbum] = useState(false);
  const [hasPermissionLocation, setHasPermissionLocation] = useState(false);
  const [latitude, setLatitude] = useState(37.5059724);
  const [longitude, setLongitude] = useState(127.0591333);
  const [uriList, setUriList] = useState([]);
  const { category } = route.params;
  const { latiDelta, longiDelta } = caculateDelta(Dimensions.get('window'));

  useEffect(() => {
    (async() => {
      try {
        const { status } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        setHasPermissionCamaraAndAlbum(status === 'granted');
      } catch(err) {
        alert(message.errorPermission);
        console.warn(err);
      }
    })();

    (async() => {
      try {
        const { status } = await Permissions.getAsync(Permissions.LOCATION);
        if (status === 'granted') {
          setHasPermissionLocation(true);
          const location = await Location.getCurrentPositionAsync({ accuracy: 4 });
          const { latitude, longitude } = location.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        }
      } catch(err) {
        alert(message.errorPermission);
        console.warn(err);
      }
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
          if (hasPermissionCameraAndAlbum) return navigation.navigate('TakeAPicture');
          alert(message.deniedPermission);
        }}
      >
        <Text style={{ color: COLOR.WHITE }}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ margin: 10, padding: 10, backgroundColor: COLOR.BLUE }}
        onPress={() => {
          if (uriList.length >= 3) return alert(message.maxImg);
          if (hasPermissionCameraAndAlbum) return onGetPictures();
          alert(message.deniedPermission);
        }}
      >
        <Text style={{ color: COLOR.WHITE }}>Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ margin: 10, padding: 10, backgroundColor: COLOR.BLUE }}
        onPress={() => {
          if (hasPermissionLocation) return navigation.navigate('ShowMap');
          alert(message.deniedPermission);
        }}
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
      <MapView
        style={{ width: 350, height: 150 }}
        initialRegion={{ latitude, longitude, latitudeDelta: latiDelta, longitudeDelta: longiDelta }}
      >
        <MapView.Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
}
