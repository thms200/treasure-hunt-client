import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import MarkedMap from '../components/MarkedMap';
import { caculateLocation } from '../utils';
import { COLOR } from '../constants';
import message from '../constants/message';
import getEnvVars from '../environment';
const { API_URL } = getEnvVars();

export default function InputTreasureDetail({ navigation, route }) {
  const [hasPermissionCameraAndAlbum, setHasPermissionCamaraAndAlbum] = useState(false);
  const [hasPermissionLocation, setHasPermissionLocation] = useState(false);
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [expiration, setExpiration] = useState(new Date().getTime());
  const [description, setDescription] = useState('');
  const [uriList, setUriList] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null, latitudeDelta: null, longitudeDelta: null });
  const { category, markedLocation } = route.params;

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
          setLocation(caculateLocation(latitude, longitude, Dimensions.get('window')));
        }
      } catch(err) {
        alert(message.errorPermission);
        console.warn(err);
      }
    })();
  }, []);

  const { uri } = route.params;
  useEffect(() => {
    if (uri && uriList.length <= 3 && !uriList.includes(uri)) {
      console.log(uri);
      setUriList((uriList) => uriList.concat(uri));
    }
  }, uri);

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
      formdata.append('country', country);
      formdata.append('category', category);
      formdata.append('name', name);
      formdata.append('expiration', expiration);
      formdata.append('latitude', markedLocation.latitude);
      formdata.append('longitude', markedLocation.longitude);
      formdata.append('description', description);
      formdata.append('is_hunting', false);

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
            return navigation.navigate('Hunt', { screen: 'GetTreasureList' });
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
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: COLOR.BLUE }}>
        <CountryPicker
          withEmoji={true}
          theme={DARK_THEME}
          onSelect={country => setCountry(country.name)}
        />
        <Text>{country}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>Name</Text>
        <TextInput
          style={{ width: 250, height: 60, borderColor: COLOR.BLUE, borderWidth: 1 }}
          onChangeText={text => setName(text)}
          value={name}
          placeholder='What is your treasure?'
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text>Expiration</Text>
        {showDate && <RNDateTimePicker
          display='calendar'
          value={new Date()}
          onChange={(ev) => {
            const newExpiration = ev.nativeEvent.timestamp || expiration;
            console.log('new', newExpiration);
            setShowDate(false);
            setExpiration(newExpiration);
          }}
        />}
        <Text onPress={() => setShowDate(true)}>{new Date(expiration).toString()}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          style={{ width: 250, height: 60, borderColor: COLOR.BLUE, borderWidth: 1 }}
          onChangeText={description => setDescription(description)}
          value={description}
          placeholder='상세 위치, 상태 등을 적어주세요!'
        />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
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
            if (location.latitude) {
              if (hasPermissionLocation) return navigation.navigate('ShowMap', { location });
              alert(message.deniedPermission);
            }
          }}
        >
          <Text style={{ color: COLOR.WHITE }}>Map</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
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
      <MarkedMap markedLocation={markedLocation} />
      <TouchableOpacity
        style={{ margin: 10, padding: 10 }}
        onPress={() => onSaveTreasure()}
      >
        <Text style={{ color: COLOR.BLUE }}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
}
