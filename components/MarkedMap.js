import React from 'react';
import { View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { caculateLocation } from '../utils';
import { COLOR } from '../constants';

export default function MarkedMap({ markedLocation }) {
  if (!markedLocation) {
    return <View />;
  } else {
    const {
      latitude, longitude, latitudeDelta, longitudeDelta
    } = caculateLocation(markedLocation.latitude, markedLocation.longitude, Dimensions.get('window'));

    return (<MapView
      style={{ width: 300, height: 150 }}
      pinColor={COLOR.BLUE}
      initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta }}
    >
      <MapView.Marker coordinate={{ latitude, longitude }} />
    </MapView>);
  }
}
