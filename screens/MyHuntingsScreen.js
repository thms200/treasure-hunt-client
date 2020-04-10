import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function MyHuntingsScreen() {
  return (
    <View style={styles.container}>
      <Text>My Huntings</Text>
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
