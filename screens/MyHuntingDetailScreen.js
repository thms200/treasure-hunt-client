import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function MyHuntingDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>My HuntingDetail</Text>
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