import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import { AntDesign } from '@expo/vector-icons';
import CameraMapRow from '../components/CameraMapRow';
import MarkedMap from '../components/MarkedMap';
import Calendar from '../components/Calendar';
import Pictures from '../components/Pictures';
import { takePictures, initialPictures } from '../actions';
import { caculateLocation } from '../utils';
import { onSaveTreasure } from '../utils/api';
import { COLOR, FONT } from '../constants';
import message from '../constants/message';

const screen = Dimensions.get('window');

export default function InputDetailScreen({ navigation, route }) {
  const [hasPermissionCamera, setHasPermissionCamara] = useState(false);
  const [hasPermissionLocation, setHasPermissionLocation] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null, latitudeDelta: null, longitudeDelta: null });
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [expiration, setExpiration] = useState(new Date().getTime());
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const uriList = useSelector(state => state.treasures.uriList);
  const dispatch = useDispatch();
  const { markedLocation } = route.params;

  useEffect(() => {
    dispatch(initialPictures());
    setCategory(route.params.category);

    (async() => {
      try {
        const { status } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        setHasPermissionCamara(status === 'granted');
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
          const location = await Location.getCurrentPositionAsync({ accuracy: 3 });
          const { latitude, longitude } = location.coords;
          setLocation(caculateLocation(latitude, longitude, screen));
        }
      } catch(err) {
        alert(message.errorPermission);
        console.warn(err);
      }
    })();


  }, []);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.categoryWrapper}>
          <View style={styles.category}>
            <Text onPress={() => setShowModal(true)} style={styles.categoryText}>Country</Text>
            <CountryPicker
              withEmoji={true}
              withFilter={true}
              withAlphaFilter={true}
              theme={DARK_THEME}
              visible={showModal}
              onSelect={country => setCountry(country.name)}
              containerButtonStyle={{ width: 0, height: 0 }}
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
        <CameraMapRow
          uriList={uriList}
          dispatch={dispatch}
          action={takePictures}
          location={location}
          hasPermissionCamera={hasPermissionCamera}
          hasPermissionLocation={hasPermissionLocation}
          navigation={navigation}
        />
        <View style={styles.pictureWrapper}>
          <Pictures uriList={uriList} style={styles.pictures} isInput={true} />
        </View>
        <View style={styles.mapWrapper}>
          <MarkedMap markedLocation={markedLocation} />
        </View>
        <View style={styles.completeWrapper}>
          <TouchableOpacity
            onPress={() => onSaveTreasure(category, country, name, description, uriList, markedLocation, expiration, navigation)}
          >
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
  pictureWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 4,
    height: 100,
  },
  pictures: {
    flex: 1,
    margin: 4,
    borderRadius: 5,
    width: 100
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
