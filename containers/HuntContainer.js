import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import TreasureList from '../components/TreasureList';
import * as SecureStore from 'expo-secure-store';
import { getTreasures } from '../actions';
import message from '../constants/message';
import getEnvVars from '../environment';
const { API_URL } = getEnvVars();

export default function Huntcontainer() {
  const treasures = useSelector(state => state.treasures.treasures);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      const currentToken = await SecureStore.getItemAsync('userToken');
      return await fetch(`${API_URL}/api/treasures?country=all&category=all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${currentToken}`,
        },
      })
        .then((res) => res.json())
        .then(async(json) => {
          if (json.result === 'ng') return alert(message.failGetInfos);
          dispatch(getTreasures(json));
        });
    })();
  }, []);

  return (
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
  );
}
