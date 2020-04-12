import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';
import message from '../constants/message';
import { COLOR } from '../constants';

export default function TakePictureScreen({ navigation }) {
  const cameraEl = useRef(null);

  const onTakePictureAndCreateAlbum = async() => {
    try {
      const { uri } = await cameraEl.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.createAlbumAsync('my_treasure', asset, false);
      if (album) {
        alert(message.createPicture);
        return navigation.navigate('InputDetail', { uri });
      }
    } catch(error) {
      console.warn(error);
      alert(message.failPicture);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        type={Camera.Constants.Type.back}
        style={{ flex: 1 }}
        ref={cameraEl}
      />
      <TouchableOpacity
        onPress={() => onTakePictureAndCreateAlbum()}
        style={styles.buttonContainer}>
        <FontAwesome
          name="camera"
          style={styles.button}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  button: {
    color: COLOR.WHITE,
    fontSize: 50
  }
});
