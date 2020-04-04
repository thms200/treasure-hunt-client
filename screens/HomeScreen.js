import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="hiding"
        onPress={() => navigation.navigate('SelectTreasureCategory')}
      />
      <Button
        title="hunting"
        onPress={() => navigation.navigate('GetTreasureList')}
      />
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
