import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '~/styles';
import TextInput from '~/components/common/TextInput';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const CustomTextInput = ({
  title,
  placeholder,
  type,
  value,
  onChangeText,
  keyboardType,
  onPress,
  iconRight,
  textRight,
  readonly
}) => {
  return (
    <View>
      {(value != null && value != "") && (
        <Text style={{color: styles.colors.subSubText, fontSize: 11, marginBottom: styles.metrics.extraSmallSize, fontFamily: "CircularStd-Book"}}>{title}</Text>
      )}
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <View style={{
          backgroundColor: readonly ? styles.colors.background : styles.colors.white, 
          marginBottom: styles.metrics.extraLargeSize, 
          borderTopRightRadius: 5, 
          borderTopLeftRadius: 5, 
          elevation: 0.5, 
          shadowColor: '#52006A',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: "100%"
        }}>
          <TextInput
            onPress={onPress}
            placeholder={title}
            value={value}
            onChangeText={onChangeText}
            type={type}
            keyboardType={keyboardType}
            editable={!readonly && type!="file" && type!="date"}
          />

          {iconRight && (
            <MaterialIcon
              color={styles.colors.primaryColor}
              name={iconRight}
              size={17}
              style={{marginHorizontal: styles.metrics.mediumSize, marginTop: styles.metrics.largeSize}}
            />
          )}

          {textRight && (
            <Text style={{
              marginHorizontal: styles.metrics.mediumSize, 
              marginTop: styles.metrics.largeSize,
              fontSize: 13,
              color: styles.colors.gray,
              fontFamily: "CircularStd-Book"}}>{textRight}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTextInput;
