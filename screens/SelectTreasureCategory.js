import React from 'react';
import { View, Button } from 'react-native';

export default function SelectTreasureCategory({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="유심"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '유심',
        })}
      />
      <Button
        title="교통"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '교통',
        })}
      />
      <Button
        title="영화/공연"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '영화/공연',
        })}
      />
      <Button
        title="입장권"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '입장권',
        })}
      />
      <Button
        title="쿠폰"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '쿠폰',
        })}
      />
      <Button
        title="기타"
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '기타',
        })}
      />
    </View>
  );
}
