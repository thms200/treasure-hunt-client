import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import { checkValidation } from '../utils';
import getEnvVars from '../environment';
const { FACEBOOK_APP_ID, API_URL } = getEnvVars();
import message from '../constants/message';

export const logInFacebook = async(navigation) => {
  try {
    await Facebook.initializeAsync(FACEBOOK_APP_ID);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['email'],
    });
    if (type !== 'success') return alert(message.invalidLogin);
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture`);
    const userInfo = await response.json();
    const { email, name } = userInfo;
    const picture_url = userInfo.picture.data.url;
    const payload = JSON.stringify({ email, name, picture_url });
    return await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    })
      .then((res) => res.json())
      .then(async(json) => {
        if (json.result === 'ng') return alert(json.errMessage);
        if (json.result === 'ok') {
          await SecureStore.setItemAsync('userToken', json.token);
          navigation.navigate('Main', { screen: 'Home' });
        }
      });
  } catch (err) {
    alert(message.invalidLogin);
    console.warn(err);
  }
};

export const checkLogin = async(navigation) => {
  try {
    const currentToken = await SecureStore.getItemAsync('userToken');
    return await fetch(`${API_URL}/api/users/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${currentToken}`,
      },
    })
      .then((res) => res.json())
      .then(async(json) => {
        if (json.result === 'ok') return navigation.navigate('Main', { screen: 'Home' });
        if (json.result === 'ng') {
          await SecureStore.deleteItemAsync('userToken');
          return alert(json.errMessage);
        }
      });
  } catch (err) {
    alert(message.invalidLogin);
    console.warn(err);
  }

};

export const fetchTreasures = async(country, category, dispatch, action) => {
  try {
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
  } catch (err) {
    alert(message.generalError);
    console.warn(err);
  }
};

export const fetchSelectedTreasure = async(id, dispatch, action) => {
  try {
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
  } catch (err) {
    alert(message.generalError);
    console.warn(err);
  }
};

export const updateSelectedTreasure = async(id, navigation) => {
  try {
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
  } catch (err) {
    alert(message.generalError);
    console.warn(err);
  }
};

export const onSaveTreasure = async(category, country, name, description, uriList, markedLocation, expiration, navigation) => {
  try {
    if (!checkValidation(category, country, name, description, uriList, markedLocation)) return;
    const formdata = new FormData();
    uriList.forEach(uri => {
      const name = uri.split('Camera/')[1] || uri.split('ImagePicker/')[1];
      const locationPicture = { uri, name, type: 'multipart/form-data', };
      formdata.append('img', locationPicture);
    });
    formdata.append('country', country);
    formdata.append('category', category);
    formdata.append('name', name);
    formdata.append('expiration', expiration);
    formdata.append('latitude', markedLocation.latitude);
    formdata.append('longitude', markedLocation.longitude);
    formdata.append('description', description);
    formdata.append('is_hunting', false);

    const userToken = await SecureStore.getItemAsync('userToken');
    return await fetch(`${API_URL}/api/treasures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': `Bearer ${userToken}`,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.result === 'ok') {
          alert(message.successSave);
          return navigation.navigate('Hunt', { screen: 'GetTreasureList' });
        }
        if (json.result === 'ng') return alert(message.failSave);
      });
  } catch(err) {
    alert(message.failSave);
    console.warn(err);
  }
};
