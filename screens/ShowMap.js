import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLOR } from '../constants';

export default function ShowMap() {
  return (
    <View style={styles.container}>
      <Text>test</Text>
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
