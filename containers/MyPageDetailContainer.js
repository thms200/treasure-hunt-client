import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { makeExpirationToString, caculateLocation } from '../utils';
import { deleteSelectedTreasure } from '../utils/api';
import { FONT, COLOR } from '../constants';

const screen = Dimensions.get('window');
const margin = screen.width * 0.02;
const imageWidth = screen.width * 0.98;

export default function MyPageDetailContainer({ navigation, type }) {
  const selectedTreasure = useSelector(state => state.treasures.selectedTreasure);
  const { name, registered_by, expiration, location_pictures_url, location, description, _id, is_hunting }
   = selectedTreasure;
  const taken = is_hunting ? `${selectedTreasure.taken_by.name} 🥳` : '.... 🥺';
  const isMyTreasures = type === 'treasure';
  const expirationDate = makeExpirationToString(expiration);
  const latitude = Number(location[0]);
  const longitude = Number(location[1]);
  const { latitudeDelta, longitudeDelta } = caculateLocation(latitude, longitude, screen);
  const onDelete = () => deleteSelectedTreasure(_id, navigation);

  console.log(selectedTreasure);
  return (
    <View style={styles.wrapper}>
      <View style={styles.nameWrapper}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.registredWrapper}>
        <Text style={styles.registedText}>By {registered_by.name}</Text>
        <Text style={styles.registedText}>Expiration {expirationDate}</Text>
      </View>
      <View style={styles.pictureWrapper}>
        <ScrollView
          horizontal
          pagingEnabled
        >
          {location_pictures_url.map((uri) => {
            return (
              <Image
                key={uri}
                style={styles.picture}
                source={{ uri }}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          pinColor={COLOR.BLUE}
          initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta }}
        >
          <MapView.Marker coordinate={{ latitude, longitude }} centerOffset={{ x: 0.5, y: 0.5 }} />
        </MapView>
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <View style={styles.footWrapper}>
        {isMyTreasures && <View style={styles.deleteWrapper}>
          <TouchableOpacity
            style={styles.delete}
            onPress={onDelete}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>}
        <View style={styles.takenWrapper}>
          <Text style={styles.takenText}>
            Taken: {taken}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  nameWrapper: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: margin,
    marginLeft: margin,
  },
  nameText: {
    fontFamily: FONT.GAMJA,
    fontSize: 45,
    color: COLOR.BLUE,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BLUE,
  },
  registredWrapper: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: margin,
    marginLeft: margin,
  },
  registedText: {
    fontFamily: FONT.GAMJA,
    fontSize: 20,
    color: COLOR.GREY,
  },
  pictureWrapper: {
    flex: 4.2,
    borderBottomColor: COLOR.GREY,
    borderTopColor: COLOR.GREY,
    borderWidth: 0.2,
  },
  picture: {
    width: imageWidth,
    resizeMode: 'contain',
  },
  mapWrapper: {
    flex: 2.5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  descriptionWrapper: {
    flex: 1.5,
    margin: margin,
    padding: margin,
    borderColor: COLOR.BLUE,
    borderWidth: 0.2,
    borderRadius: 10,
  },
  descriptionText: {
    fontFamily: FONT.GAMJA,
    fontSize: 25,
  },
  footWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: margin,
  },
  deleteWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: margin,
    borderRadius: 10,
    backgroundColor: COLOR.BLUE,
  },
  takenWrapper: {
    flex: 2.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontFamily: FONT.PT_BOLD,
    fontSize: 40,
    color: COLOR.WHITE,
  },
  takenText: {
    fontFamily: FONT.PT_BOLD,
    fontSize: 40,
    color: COLOR.BLUE,
  }
});

MyPageDetailContainer.propTypes = {
  type: PropTypes.string.isRequired,
};
