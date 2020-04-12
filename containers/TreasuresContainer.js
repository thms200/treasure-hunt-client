import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const onLoad  = async() => {
    await fetchTreasures('all', 'all', dispatch, getTreasures);
    setIsLoading(false);
  };
  const onCategory = async(category) => await fetchTreasures('all', category, dispatch, getTreasures);
  const onCountry = async(country) => await fetchTreasures(country, 'all', dispatch, getTreasures);
  const onTreasure = async(id) => await fetchSelectedTreasure(id, dispatch, getSelectedTreasure);

  useEffect(() => {
    onLoad();
    navigation.addListener('focus', onLoad);
    const unsubscribe = navigation.addListener('blur', () => setIsLoading(true));
    return unsubscribe;
  }, [navigation]);

  if(isLoading) {
    return <View />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Categorys onCategory={onCategory} />
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
                  page={'generalPage'}
                  navigation={navigation}
                  onCountry={onCountry}
                  onTreasure={onTreasure}
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  treasuresWrapper: {
    flex: 9,
    backgroundColor: COLOR.WHITE
  },
});
