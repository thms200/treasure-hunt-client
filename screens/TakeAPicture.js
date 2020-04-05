import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';
import message from '../constants/message';

export default function TakeAPicture() {
  const cameraEl = useRef(null);

  const takePictureAndCreateAlbum = async() => {
    const { uri } = await cameraEl.current.takePictureAsync();
    const asset = await MediaLibrary.createAssetAsync(uri);
    return await MediaLibrary.createAlbumAsync('my_treasure', asset)
      .then(() => {
        alert(message.createPicture);
      })
      .catch(error => {
        console.warn(error);
        alert(message.failPicture);
      });
  };

  return (
    <View style={styles.container}>
      <Camera
        type={Camera.Constants.Type.back}
        style={{ flex: 1 }}
        ref={cameraEl}
      />
      <TouchableOpacity
        onPress={() => takePictureAndCreateAlbum()}
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
    color: '#fff',
    fontSize: 50
  }
});
