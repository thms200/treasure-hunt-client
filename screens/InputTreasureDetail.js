import React from 'react';
import { Text, View } from 'react-native';

export default function InputTreasureDetail({ route }) {
  const { category } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{category}</Text>
    </View>
  );
}
