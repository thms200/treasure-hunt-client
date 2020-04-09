import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

export default function TreasureList({ name, country, expiration }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.title}>{country}</Text>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.title}>{expiration}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

TreasureList.propTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  expiration: PropTypes.string.isRequired,
};
