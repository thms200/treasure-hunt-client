import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import { COLOR, FONT } from '../constants';
import message from '../constants/message';

export default function CameraMapRow({ uriList, dispatch, action, location, hasPermissionCamera, hasPermissionLocation, navigation }) {

  const onCamera = () => {
    if (uriList.length >= 3) return alert(message.maxImg);
    if (!hasPermissionCamera) return alert(message.deniedPermission);
    navigation.navigate('Hide', { screen: 'TakePicture' });
  };

  const onGallery = async() => {
    if (uriList.length >= 3) return alert(message.maxImg);
    if (!hasPermissionCamera) return alert(message.deniedPermission);
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) return;

    const { uri } = pickerResult;
    dispatch(action(uri));
  };

  const onMap = () => {
    if (location.latitude) {
      if (!hasPermissionLocation) return alert(message.deniedPermission);
      navigation.navigate('ShowMap', { location });
    }
  };

  return (
    <View style={styles.categoryWrapper}>
      <TouchableOpacity
        style={styles.cameraAndMapWrapper}
        onPress={onCamera}
      >
        <Text style={styles.categoryText}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cameraAndMapWrapper}
        onPress={onGallery}
      >
        <Text style={styles.categoryText}>Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cameraAndMapWrapper}
        onPress={onMap}
      >
        <Text style={styles.categoryText}>Map</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 2,
  },
  categoryText: {
    fontFamily: FONT.PT_BOLD,
    fontSize: 28,
    color: COLOR.WHITE,
    textAlign: 'center',
  },
  cameraAndMapWrapper: {
    flex: 1,
    justifyContent: 'center',
    margin: 4,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.BLUE,
    backgroundColor: COLOR.BLUE
  },
});

CameraMapRow.propTypes = {
  uriList: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  hasPermissionCamera: PropTypes.bool.isRequired,
  hasPermissionLocation: PropTypes.bool.isRequired,
};
