import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Entypo, Ionicons, MaterialCommunityIcons, Foundation, FontAwesome5 } from '@expo/vector-icons';
import { COLOR, FONT } from '../constants';

const { width } = Dimensions.get('window');
const screenWidth = width / 7;
const margin = screenWidth * 0.02;

export default function Categorys({ onClickCategory }) {
  return (
    <View style={styles.topWrapper}>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={async() => await onClickCategory('usim')}>
          <Entypo name="creative-commons-share" style={styles.icons} />
          <Text style={styles.text}>유심</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={async() => await onClickCategory('transportation')}>
          <Ionicons name="md-train" style={styles.icons} />
          <Text style={styles.text}>교통</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={async() => await onClickCategory('show')}>
          <MaterialCommunityIcons name="music-circle-outline" style={styles.icons} />
          <Text style={styles.text}>영화|공연</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={async() => await onClickCategory('ticket')}>
          <Foundation name="ticket" style={styles.icons} />
          <Text style={styles.text}>입장권</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={async() => await onClickCategory('coupon')}>
          <FontAwesome5 name="money-check-alt" style={styles.icons} />
          <Text style={styles.text}>쿠폰</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={async() => await onClickCategory('etc')}>
          <MaterialCommunityIcons name="dots-horizontal-circle" style={styles.icons} />
          <Text style={styles.text}>기타</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryWrapper}>
        <TouchableOpacity onPress={async() => await onClickCategory('all')}>
          <FontAwesome5 name="home" style={styles.icons} />
          <Text style={styles.text}>All</Text>
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
    fontSize: 16,
    textAlign: 'center',
    color: COLOR.WHITE,
    fontFamily: FONT.GAMJA,
  }
});

Categorys.propTypes = {
  onClickCategory: PropTypes.func.isRequired,
};