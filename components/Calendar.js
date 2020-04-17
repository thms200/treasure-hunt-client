import React, { useState } from 'react';
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
    <RNDateTimePicker
      display="default"
      mode="date"
      value={date}
      onChange={onChange}
    />
  );
}

Calendar.propTypes = {
  setShowDate: PropTypes.func.isRequired,
  setExpiration: PropTypes.func.isRequired,
};
