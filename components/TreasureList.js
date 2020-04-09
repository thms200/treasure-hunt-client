import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { COLOR, FONT } from '../constants';

const { width } = Dimensions.get('window');
const margin = width * 0.01;
const padding = width * 0.01;

export default function TreasureList({ name, country, expiration, id, navigation, fetchTreasures, dispatch, action }) {
  const year = new Date(expiration).getFullYear();
  const month = new Date(expiration).getMonth() + 1;
  const date = new Date(expiration).getDate();
  const expirationDate = `${year}/${month}/${date}`;

  return (
    <View style={styles.topWrapper}>
      <View style={styles.rowWrapper}>
        <View style={styles.flagWrapper}>
          <Image
            style={{ width: 45, height: 45 }}
            source={{ uri: `https://img.icons8.com/color/48/000000/${country.toLowerCase()}-circular.png` }}
          />
        </View>
        <View style={styles.contryWrapper}>
          <Text onPress={() => fetchTreasures(country, 'all', dispatch, action)}>{country}</Text>
        </View>
        <View style={styles.nameWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('GetTreasureDetail', { id })}>
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.expirationWrapper}>
          <Text style={styles.text}>{expirationDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin,
  },
  rowWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.BLUE,
    borderBottomWidth: 0.8,
    padding,
  },
  flagWrapper: {
    flex: 0.6,
  },
  contryWrapper: {
    flex: 0.9,
    textAlign: 'center',
  },
  nameWrapper: {
    flex: 2,
  },
  expirationWrapper: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontFamily: FONT.GAMJA,
  }
});

TreasureList.propTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  expiration: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  fetchTreasures: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
};
