import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GetTreasureDetail({ route }) {
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
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
});
