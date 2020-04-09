import * as SecureStore from 'expo-secure-store';
import getEnvVars from '../environment';
const { API_URL } = getEnvVars();
import message from '../constants/message';

export const fetchTreasures = async(country, category, dispatch, action) => {
  const currentToken = await SecureStore.getItemAsync('userToken');
  return await fetch(`${API_URL}/api/treasures?country=${country}&category=${category}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${currentToken}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.result === 'ng') return alert(json.errMessage);
      dispatch(action(json));
    });
};

export const fetchSelectedTreasure = async(id, dispatch, action) => {
  const currentToken = await SecureStore.getItemAsync('userToken');
  return await fetch(`${API_URL}/api/treasures/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${currentToken}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.result === 'ng') return alert(json.errMessage);
      dispatch(action(json));
    });
};

export const updateSelectedTreasure = async(id, navigation) => {
  const currentToken = await SecureStore.getItemAsync('userToken');
  return await fetch(`${API_URL}/api/treasures/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${currentToken}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.result === 'ng') return alert(json.errMessage);
      alert(message.successTaken);
      navigation.navigate('GetTreasureList');
    });
};
