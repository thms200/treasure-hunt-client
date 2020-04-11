import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import TreasureList from '../components/TreasureList';
import { getTreasures, getSelectedTreasure } from '../actions';
import { fetchMyTreasures, fetchMyHungings, fetchSelectedTreasure } from '../utils/api';
import { COLOR } from '../constants';

export default function MyPageContainer({ navigation, myPage }) {
  const [isLoading, setIsLoading] = useState(true);
  const treasures = useSelector(state => state.treasures.treasures);
  const userInfo = useSelector(state => state.user.userInfo);
  const dispatch = useDispatch();

  const onLoad  = async() => {
    if(myPage === 'treasure') {
      await fetchMyTreasures(userInfo.id, dispatch, getTreasures);
    } else {
      await fetchMyHungings(userInfo.id, dispatch, getTreasures);
    }
    setIsLoading(false);
  };
  const onClickTreasure = async(id) => await fetchSelectedTreasure(id, dispatch, getSelectedTreasure);

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
                is_hunting={item.is_hunting}
                page={'myPage'}
                navigation={navigation}
                onClickTreasure={onClickTreasure}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  treasuresWrapper: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
});
