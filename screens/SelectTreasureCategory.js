import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons, Foundation, FontAwesome5 } from '@expo/vector-icons';
import { COLOR, FONT } from '../constants';

export default function SelectTreasureCategory({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '유심',
        })}
      >
        <View style={styles.iconWrapper}>
          <Entypo name="creative-commons-share" style={styles.icons} />
          <Text style={styles.text}>유심</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '교통',
        })}
      >
        <View style={styles.iconWrapper}>
          <Ionicons name="md-train" style={styles.icons} />
          <Text style={styles.text}>교통</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '영화/공연',
        })}
      >
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name="music-circle-outline" style={styles.icons} />
          <Text style={styles.text}>영화/공연</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '입장권',
        })}
      >
        <View style={styles.iconWrapper}>
          <Foundation name="ticket" style={styles.icons} />
          <Text style={styles.text}>입장권</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '쿠폰',
        })}
      >
        <View style={styles.iconWrapper}>
          <FontAwesome5 name="money-check-alt" style={styles.icons} />
          <Text style={styles.text}>쿠폰</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate('InputTreasureDetail', {
          category: '기타',
        })}
      >
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name="dots-horizontal-circle" style={styles.icons} />
          <Text style={styles.text}>기타</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  icons: {
    color: COLOR.BLUE,
    fontSize: 50,
  },
  text: {
    padding: 10,
    width: 120,
    borderRadius: 15,
    fontSize: 27,
    textAlign: 'center',
    color: COLOR.WHITE,
    fontFamily: FONT.GAMJA,
    backgroundColor: COLOR.BLUE
  }
});
