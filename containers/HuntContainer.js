import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import TreasureList from '../components/TreasureList';
import Categorys from '../components/Categorys';
import { getTreasures } from '../actions';
import { fetchTreasures } from '../utils';
import { COLOR, FONT } from '../constants';

export default function Huntcontainer({ navigation }) {
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
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.bottomWrapper}>
        <Text
          style={styles.bottomText}
          onPress={() => navigation.navigate('Hide', { screen: 'SelectTreasureCategory' })}
        >
          Hiding
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  treasuresWrapper: {
    flex: 8.2,
    backgroundColor: COLOR.WHITE
  },
  bottomWrapper: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.BLUE,
  },
  bottomText: {
    fontSize: 40,
    color: COLOR.WHITE,
    fontFamily: FONT.PT_BOLD,
  }
});
