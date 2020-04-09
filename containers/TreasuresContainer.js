import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import TreasureList from '../components/TreasureList';
import Categorys from '../components/Categorys';
import { getTreasures } from '../actions';
import { fetchTreasures } from '../utils/api';
import { COLOR, FONT } from '../constants';

export default function TreasuresContainer({ navigation }) {
  const treasures = useSelector(state => state.treasures.treasures);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTreasures('all', 'all', dispatch, getTreasures);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Categorys fetchTreasures={fetchTreasures} dispatch={dispatch} action={getTreasures} />
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
                fetchTreasures={fetchTreasures}
                dispatch={dispatch}
                action={getTreasures}
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
