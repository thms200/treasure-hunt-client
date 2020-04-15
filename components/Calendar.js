import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import message from '../constants/message';


export default function Calendar({ setShowDate, setExpiration }) {
  const [date, setDate] = useState(new Date());
  const onChange = (ev, selectedDate) => {
    const newExpiration = ev.nativeEvent.timestamp || new Date().getTime();
    setShowDate(false);
    setDate(selectedDate);
    if (new Date() > new Date(newExpiration)) return alert(message.invalidExpiration);
    return setExpiration(newExpiration);
  };

  return (
    <View style={styles.wrapper}>
      <RNDateTimePicker
        display="default"
        mode="date"
        value={date}
        onChange={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: Dimensions.get('window').height * 0.8,
    justifyContent: 'center',
  },
});

Calendar.propTypes = {
  setShowDate: PropTypes.func.isRequired,
  setExpiration: PropTypes.func.isRequired,
};
