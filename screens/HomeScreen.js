import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLOR, FONT } from '../constants';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.hidingButton}
        onPress={() => navigation.navigate('Hide', { screen: 'SelectTreasureCategory' })}
      >
        <Text style={styles.text}>Hiding</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.huntingContainer}
        onPress={() => navigation.navigate('Hunt', { screen: 'GetTreasureList' })}
      >
        <Text style={styles.text}>Hunting</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  hidingButton: {
    marginTop: 250,
    padding: 20,
    width: 250,
    borderRadius: 15,
    backgroundColor: COLOR.BLUE,
  },
  huntingContainer: {
    marginTop: 100,
    padding: 20,
    width: 250,
    borderRadius: 15,
    backgroundColor: COLOR.BLUE,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: COLOR.WHITE,
    fontFamily: FONT.RIGHT,
  }
});
