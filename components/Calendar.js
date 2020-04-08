import React from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import message from '../constants/message';

export default function Calendar({ setShowDate, setExpiration }) {
  return (
    <RNDateTimePicker
      display='calendar'
      value={new Date()}
      onChange={(ev) => {
        const newExpiration = ev.nativeEvent.timestamp || new Date().getTime();
        setShowDate(false);
        if (new Date() > new Date(newExpiration)) return alert(message.invalidExpiration);
        return setExpiration(newExpiration);
      }}
    />
  );
}

Calendar.propTypes = {
  setShowDate: PropTypes.func.isRequired,
  setExpiration: PropTypes.func.isRequired,
};