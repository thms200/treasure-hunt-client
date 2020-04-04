import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function GetTreasureList({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="영국 교통 패스"
        onPress={() => navigation.navigate('GetTreasureDetail', {
          id: '영국 교통 패스 DB id',
        })}
      />
      <Button
        title="프랑스 유심"
        onPress={() => navigation.navigate('GetTreasureDetail', {
          id: '프랑스 유심 DB id',
        })}
      />
      <Button
        title="Hiding"
        onPress={() => navigation.navigate('SelectTreasureCategory')}
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
