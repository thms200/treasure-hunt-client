import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import CameraMapBox from './CameraMapBox';
import message from '../constants/message';

export default function CameraMapRow({
  uriList,
  dispatch,
  action,
  location,
  hasPermissionCamera,
  hasPermissionLocation,
  navigation
}) {
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

  const types = [
    { title: 'Camera', onPress: onCamera },
    { title: 'Gallery', onPress: onGallery },
    { title: 'Map', onPress: onMap },
  ];

  return (
    <View style={styles.categoryWrapper}>
      {types.map((type, index) => {
        return (<CameraMapBox
          key={index}
          type={type.title}
          onPress={type.onPress}
        />);
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 2,
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
