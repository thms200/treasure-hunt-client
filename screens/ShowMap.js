import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View, Dimensions } from 'react-native';
import message from '../constants/message';
import { caculateDelta } from '../utils';

export default function ShowMap() {
  const [latitude, setLatitude] = useState(37.5059724);
  const [longitude, setLongitude] = useState(127.0591333);
  const { latiDelta, longiDelta } = caculateDelta(Dimensions.get('window'));

  useEffect(() => {
    (async() => {
      try {
        const location = await Location.getCurrentPositionAsync({ accuracy: 4 });
        const { latitude, longitude } = location.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      } catch(err) {
        alert(message.errorPermission);
        console.warn(err);
      }
    })();
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{ latitude, longitude, latitudeDelta: latiDelta, longitudeDelta: longiDelta }}
      >
        <MapView.Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
