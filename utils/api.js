import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
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
    const response = await axios({
      method: 'post',
      url: `https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture`,
    });
    const { email, name } = response.data;
    const picture_url = response.data.picture.data.url;
    const payload = { email, name, picture_url };

    return await axios({
      method: 'post',
      url: `${API_URL}/api/users/login`,
      headers: { 'Content-Type': 'application/json' },
      data: payload
    })
      .then(async(res) => {
        const { data } = res;
        if (data.result === 'ng') return alert(data.errMessage);
        await SecureStore.setItemAsync('userToken', data.token);
        dispatch(action(data.userInfo));
      });
  } catch (err) {
    alert(message.invalidLogin);
    console.warn(err);
  }
};

export const checkLogin = async(dispatch, action) => {
  try {
    const currentToken = await SecureStore.getItemAsync('userToken');
    if (!currentToken) return;
    return await axios({
      method: 'post',
      url: `${API_URL}/api/users/auth`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${currentToken}`,
      },
    })
      .then(async(res) => {
        const { data } = res;
        if (data.result === 'ng') return await SecureStore.deleteItemAsync('userToken');
        await SecureStore.setItemAsync('userToken', data.token);
        dispatch(action(data.userInfo));
      });
  } catch (err) {
    alert(message.invalidLogin);
    console.warn(err);
  }
};

export const fetchTreasures = async(country, category, dispatch, action) => {
  try {
    const currentToken = await SecureStore.getItemAsync('userToken');
    return await axios({
      method: 'get',
      url: `${API_URL}/api/treasures?country=${country}&category=${category}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${currentToken}`,
      },
    })
      .then((res) => {
        const { data } = res;
        if (data.result === 'ng') return alert(data.errMessage);
        dispatch(action(data));
      });
  } catch (err) {
    alert(message.generalError);
    console.warn(err);
  }
};

export const fetchSelectedTreasure = async(id, dispatch, action) => {
  try {
    const currentToken = await SecureStore.getItemAsync('userToken');
    return await axios({
      method: 'get',
      url: `${API_URL}/api/treasures/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${currentToken}`,
      },
    })
      .then((res) => {
        const { data } = res;
        if (data.result === 'ng') return alert(data.errMessage);
        dispatch(action(data));
      });
  } catch (err) {
    alert(message.generalError);
    console.warn(err);
  }
};

export const updateSelectedTreasure = async(id, navigation) => {
  try {
    const currentToken = await SecureStore.getItemAsync('userToken');
    return await axios({
      method: 'put',
      url: `${API_URL}/api/treasures/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${currentToken}`,
      },
    })
      .then((res) => {
        const { data } = res;
        if (data.result === 'ng') return alert(data.errMessage);
        alert(message.success);
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
      const name = uri.split('Camera/')[1] || uri.split('ImagePicker/')[1] || uri.split('ImageManipulator/')[1];
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
    return await axios({
      method: 'post',
      url: `${API_URL}/api/treasures`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${currentToken}`,
      },
      data: formdata,
    })
      .then((res) => {
        const { data } = res;
        if (data.result === 'ng') return alert(data.failSave);
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
    return await axios({
      method: 'get',
      url: `${API_URL}/api/users/${userId}/treasures`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${currentToken}`,
      },
    })
      .then((res) => {
        const { data } = res;
        if (data.result === 'ng') return alert(data.errMessage);
        dispatch(action(data));
      });
  } catch (err) {
    alert(message.generalError);
    console.warn(err);
  }
};

export const fetchMyHungings = async(userId, dispatch, action) => {
  try {
    const currentToken = await SecureStore.getItemAsync('userToken');
    return await axios({
      method: 'get',
      url: `${API_URL}/api/users/${userId}/huntings`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${currentToken}`,
      },
    })
      .then((res) => {
        const { data } = res;
        if (data.result === 'ng') return alert(data.errMessage);
        dispatch(action(data));
      });
  } catch (err) {
    alert(message.generalError);
    console.warn(err);
  }
};

export const deleteSelectedTreasure = async(id, navigation) => {
  try {
    const currentToken = await SecureStore.getItemAsync('userToken');
    return await axios({
      method: 'delete',
      url: `${API_URL}/api/treasures/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${currentToken}`,
      },
    })
      .then((res) => {
        const { data } = res;
        if (data.result === 'ng') return alert(data.errMessage);
        alert(message.success);
        navigation.goBack();
      });
  } catch (err) {
    alert(message.generalError);
    console.warn(err);
  }
};
