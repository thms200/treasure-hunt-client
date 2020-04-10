import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function MyTreasuresScreen() {
  return (
    <View style={styles.container}>
      <Text>My Treasures</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
