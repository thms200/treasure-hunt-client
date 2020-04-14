import React, { Fragment } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Foundation } from '@expo/vector-icons';
import Pictures from '../components/Pictures';
import MarkedMap from '../components/MarkedMap';
import { makeExpirationToString } from '../utils';
import { FONT, COLOR } from '../constants';

const screen = Dimensions.get('window');
const margin = screen.width * 0.02;
const imageWidth = screen.width * 0.98;

export default function TreasureDetail({ selectedTreasure, navigation }) {
  const { name, registered_by, expiration, location_pictures_url, location, description }
   = selectedTreasure;
  const expirationDate = makeExpirationToString(expiration);
  const markedLocation = {
    latitude: Number(location[0]),
    longitude: Number(location[1]),
  };

  const onShowPictures = () => {
    navigation.navigate('ShowPictures', { urlList: location_pictures_url });
  };

  return (
    <Fragment>
      <View style={styles.nameWrapper}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.registredWrapper}>
        <Text style={styles.registedText}>Expiration {expirationDate}</Text>
        <Text style={styles.registedText}>By {registered_by.name}</Text>
        <Foundation
          name="magnifying-glass"
          size={20}
          style={styles.registedText}
          onPress={onShowPictures}
        />
      </View>
      <View style={styles.pictureWrapper}>
        <ScrollView
          horizontal
          pagingEnabled
        >
          <Pictures
            uriList={location_pictures_url}
            style={styles.picture}
            isInput={false}
          />
        </ScrollView>
      </View>
      <View style={styles.mapWrapper}>
        <MarkedMap markedLocation={markedLocation} />
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
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
  },
  mapWrapper: {
    flex: 2.5,
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
});

TreasureDetail.propTypes = {
  selectedTreasure: PropTypes.object.isRequired,
};
