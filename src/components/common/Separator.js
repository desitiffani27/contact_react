import React from 'react';
import {View} from 'react-native';
import styles from '~/styles';

const Separator = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: styles.colors.underline,
      }}
    />
  );
};

export default Separator;
