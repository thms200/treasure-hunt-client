import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Entypo, Ionicons, MaterialCommunityIcons, Foundation, FontAwesome5 } from '@expo/vector-icons';
import { COLOR, FONT } from '../constants';

const { width, height } = Dimensions.get('window');
const screenHight = height * 0.2;
const screenWidth = width / 6;
const margin = screenWidth * 0.04;
const top = screenHight * 0.15;

export default function Categorys({ fetchTreasures, dispatch, action }) {
  return (
    <View style={styles.topWrapper}>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={() => fetchTreasures('all', 'usim', dispatch, action)}>
          <Entypo name="creative-commons-share" style={styles.icons} />
          <Text style={styles.text}>유심</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={() => fetchTreasures('all', 'transportation', dispatch, action)}>
          <Ionicons name="md-train" style={styles.icons} />
          <Text style={styles.text}>교통</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={() => fetchTreasures('all', 'show', dispatch, action)}>
          <MaterialCommunityIcons name="music-circle-outline" style={styles.icons} />
          <Text style={styles.text}>영화|공연</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={() => fetchTreasures('all', 'ticket', dispatch, action)}>
          <Foundation name="ticket" style={styles.icons} />
          <Text style={styles.text}>입장권</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={() => fetchTreasures('all', 'coupon', dispatch, action)}>
          <FontAwesome5 name="money-check-alt" style={styles.icons} />
          <Text style={styles.text}>쿠폰</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={() => fetchTreasures('all', 'etc', dispatch, action)}>
          <MaterialCommunityIcons name="dots-horizontal-circle" style={styles.icons} />
          <Text style={styles.text}>기타</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: top,
  },
  categoryWrapper: {
    flex: 1,
    alignItems: 'center',
    margin,
    borderRadius: 8,
    backgroundColor: COLOR.BLUE
  },
  icons: {
    fontSize: 40,
    textAlign: 'center',
    color: COLOR.WHITE,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: COLOR.WHITE,
    fontFamily: FONT.GAMJA,
  }
});

Categorys.propTypes = {
  fetchTreasures: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
};
