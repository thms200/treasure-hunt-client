import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TreasureDetail from '../components/TreasureDetail';
import { updateSelectedTreasure } from '../utils/api';
import { FONT, COLOR } from '../constants';

export default function TreasureDetailContainer({ navigation }) {
  const selectedTreasure = useSelector(state => state.treasures.selectedTreasure);
  const { _id } = selectedTreasure;
  const onHunting = () => updateSelectedTreasure(_id, navigation);

  return (
    <View style={styles.wrapper}>
      <TreasureDetail selectedTreasure={selectedTreasure} navigation={navigation} />
      <View style={styles.completeWrapper}>
        <TouchableOpacity onPress={onHunting}>
          <Text style={styles.completeText} >
            Hunting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  completeWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.BLUE,
  },
  completeText: {
    fontSize: 45,
    color: COLOR.WHITE,
    fontFamily: FONT.PT_BOLD,
  }
});
