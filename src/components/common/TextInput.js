import React from 'react';
import {
  TextInput as Input,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styles from '~/styles';

const TextInput = ({
  placeholder,
  type,
  value,
  onChangeText,
  keyboardType = 'default',
  onPress,
  textAlign = 'left',
  editable = true
}) => {
  const stylesComponent = StyleSheet.create({
    // Input
    input: {
      padding: styles.metrics.mediumSize,
      color: styles.colors.darkText,
      fontFamily: "CircularStd-Book",
      flex: 1
    },
  });

  return (
    <Input
      editable={onPress ? false : true}
      placeholder={placeholder}
      underlineColorAndroid={'transparent'}
      secureTextEntry={type === 'password'}
      textContentType={type}
      autoCorrect={false}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      style={stylesComponent.input}
      textAlign={textAlign}
      editable={editable}
    />
  );
};

export default TextInput;
