import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import { AntDesign } from '@expo/vector-icons';
import MarkedMap from '../components/MarkedMap';
import Calendar from '../components/Calendar';
import Pictures from '../components/Pictures';
import { caculateLocation, checkValidation } from '../utils';
import { COLOR, FONT } from '../constants';
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
      if (!checkValidation(country, name, description, uriList, markedLocation)) return;
      console.log('validation after');
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
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.categoryWrapper}>
          <View style={styles.category}>
            <CountryPicker
              withEmoji={true}
              withFilter={true}
              withAlphaFilter={true}
              theme={DARK_THEME}
              onSelect={country => setCountry(country.name)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText}>{country}</Text>
          </View>
        </View>
        <View style={styles.categoryWrapper}>
          <View style={styles.category}>
            <Text style={styles.categoryText}>Name</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputText}
              onChangeText={text => setName(text)}
              value={name}
              placeholder='What is your treasure?'
            />
          </View>
        </View>
        <View style={styles.categoryWrapper}>
          <View style={styles.category}>
            <Text style={styles.categoryText}>Expiration</Text>
          </View>
          {showDate && <Calendar expiration={expiration} setShowDate={setShowDate} setExpiration={setExpiration} />}
          <View style={styles.expirationInput}>
            <Text style={styles.inputText}>{new Date(expiration).toString().slice(0, 15)}</Text>
            <AntDesign
              name="calendar"
              style={{ fontSize: 30, color: COLOR.BLUE }}
              onPress={() => setShowDate(true)}
            />
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <TextInput
            style={styles.inputText}
            onChangeText={description => setDescription(description)}
            value={description}
            placeholder='Please write down the detailed location, specific issue, etc. of the hidden treasure!'
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={styles.categoryWrapper}>
          <TouchableOpacity
            style={styles.cameraAmdMapWrapper}
            onPress={() => {
              if (uriList.length >= 3) return alert(message.maxImg);
              if (hasPermissionCameraAndAlbum) return navigation.navigate('TakeAPicture');
              alert(message.deniedPermission);
            }}
          >
            <Text style={styles.categoryText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraAmdMapWrapper}
            onPress={() => {
              if (uriList.length >= 3) return alert(message.maxImg);
              if (hasPermissionCameraAndAlbum) return onGetPictures();
              alert(message.deniedPermission);
            }}
          >
            <Text style={styles.categoryText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraAmdMapWrapper}
            onPress={() => {
              if (location.latitude) {
                if (hasPermissionLocation) return navigation.navigate('ShowMap', { location });
                alert(message.deniedPermission);
              }
            }}
          >
            <Text style={styles.categoryText}>Map</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pictureWrapper}>
          <Pictures uriList={uriList} />
        </View>
        <View style={styles.mapWrapper}>
          <MarkedMap markedLocation={markedLocation} />
        </View>
        <View style={styles.completeWrapper}>
          <TouchableOpacity onPress={() => onSaveTreasure()}>
            <Text style={styles.completeText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  categoryWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 2,
  },
  category: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    backgroundColor: COLOR.BLUE,
  },
  categoryText: {
    fontFamily: FONT.PT_BOLD,
    fontSize: 28,
    color: COLOR.WHITE,
    textAlign: 'center',
  },
  inputWrapper: {
    flex: 2.8,
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.BLUE,
  },
  inputText: {
    fontFamily: FONT.GAMJA,
    fontSize: 22,
  },
  expirationInput: {
    flex: 2.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.BLUE,
  },
  expirationWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  descriptionWrapper: {
    flex: 1,
    margin: 7,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.BLUE,
  },
  cameraAmdMapWrapper: {
    flex: 1,
    justifyContent: 'center',
    margin: 4,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.BLUE,
    backgroundColor: COLOR.BLUE
  },
  pictureWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 4,
    height: 100,
  },
  mapWrapper: {
    flex: 2,
    margin: 4,
    width: '96%',
    height: 230,
  },
  completeWrapper: {
    flex: 1,
    margin: 5,
  },
  completeText: {
    fontFamily: FONT.PT_BOLD,
    fontSize: 40,
    color: COLOR.BLUE,
    textAlign: 'center',
  },
});
