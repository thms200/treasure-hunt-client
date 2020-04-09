import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import TreasureList from '../components/TreasureList';
import Categorys from '../components/Categorys';
import { getTreasures, getSelectedTreasure } from '../actions';
import { fetchTreasures, fetchSelectedTreasure } from '../utils/api';
import { COLOR } from '../constants';

export default function TreasuresContainer({ navigation }) {
  const treasures = useSelector(state => state.treasures.treasures);
  const dispatch = useDispatch();
  const onClickCategory = async(category) => await fetchTreasures('all', category, dispatch, getTreasures);
  const onClickCountry = async(country) => await fetchTreasures(country, 'all', dispatch, getTreasures);
  const onClickTreasure = async(id) => await fetchSelectedTreasure(id, dispatch, getSelectedTreasure);

  useEffect(() => {
    fetchTreasures('all', 'all', dispatch, getTreasures);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Categorys onClickCategory={onClickCategory} />
      <View style={styles.treasuresWrapper}>
        <FlatList
          data={treasures}
          renderItem={({ item }) => {
            return (
              <TreasureList
                name={item.name}
                country={item.country}
                expiration={item.expiration}
                id={item.id}
                navigation={navigation}
                onClickCountry={onClickCountry}
                onClickTreasure={onClickTreasure}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  treasuresWrapper: {
    flex: 9,
    backgroundColor: COLOR.WHITE
  },
});
