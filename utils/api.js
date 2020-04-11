import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import { checkValidation } from '../utils';
import getEnvVars from '../environment';
const { FACEBOOK_APP_ID, API_URL } = getEnvVars();
import message from '../constants/message';

export const logInFacebook = async(dispatch, action) => {
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
        await SecureStore.setItemAsync('userToken', json.token);
        dispatch(action(json.userInfo));
      });
  } catch (err) {
    alert(message.invalidLogin);
    console.warn(err);
  }
};

export const checkLogin = async(dispatch, action) => {
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
        if (json.result === 'ng') await SecureStore.deleteItemAsync('userToken');
        dispatch(action(json.userInfo));
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
        navigation.navigate('Hunt', { screen: 'Treasures' });
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

    const currentToken = await SecureStore.getItemAsync('userToken');
    return await fetch(`${API_URL}/api/treasures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': `Bearer ${currentToken}`,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.result === 'ng') return alert(message.failSave);
        alert(message.successSave);
        navigation.navigate('Hunt', { screen: 'Treasures' });
      });
  } catch(err) {
    alert(message.failSave);
    console.warn(err);
  }
};

export const fetchMyTreasures = async(userId, dispatch, action) => {
  try {
    const currentToken = await SecureStore.getItemAsync('userToken');
    return await fetch(`${API_URL}/api/users/${userId}/treasures`, {
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

export const fetchMyHungings = async(userId, dispatch, action) => {
  try {
    const currentToken = await SecureStore.getItemAsync('userToken');
    return await fetch(`${API_URL}/api/users/${userId}/huntings`, {
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

export const deleteSelectedTreasure = async(id, navigation) => {
  try {
    const currentToken = await SecureStore.getItemAsync('userToken');
    return await fetch(`${API_URL}/api/treasures/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${currentToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.result === 'ng') return alert(json.errMessage);
        alert(message.successTaken);
        navigation.navigate('Hunt', { screen: 'Treasures' });
      });
  } catch (err) {
    alert(message.generalError);
    console.warn(err);
  }
};
