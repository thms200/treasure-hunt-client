import * as SecureStore from 'expo-secure-store';
import getEnvVars from '../environment';
const { API_URL } = getEnvVars();
import message from '../constants/message';

export const caculateLocation = (latitude, longitude, screen) => {
  const aspectRatio = screen.width / screen.height;
  const latitudeDelta = 0.0922;
  const longitudeDelta = latitudeDelta * aspectRatio;
  return { latitude, longitude, latitudeDelta, longitudeDelta };
};

export const checkValidation = (category, country, name, description, uriList, markedLocation) => {
  if (!category) {
    alert(message.noneCategory);
    return false;
  } else if (!country) {
    alert(message.noneCountry);
    return false;
  } else if (!name) {
    alert(message.noneName);
    return false;
  } else if (!description) {
    alert(message.noneDescription);
    return false;
  } else if (!uriList.length) {
    alert(message.nonePictures);
    return false;
  } else if (!markedLocation) {
    alert(message.noneMap);
    return false;
  }
  return true;
};

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
    .then(async(json) => {
      if (json.result === 'ng') return alert(message.failGetInfos);
      dispatch(action(json));
    });
};
