/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Theme from '~/styles';

const InfoEmpty = props => {
  const {defaultContent, text, imageDefault} = styles;
  const {title, refreshing, onRefresh, scrollEnabled} = props;
  return (
    <ScrollView
      style={{width: '100%'}}
      scrollEnabled={scrollEnabled}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={defaultContent}>
        <Text style={text}>{title}</Text>
        <View style={{bottom: 0, height: '100%'}}>
          <Image source={{uri: 'bg_no_item_city'}} style={imageDefault} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  defaultContent: {
    alignContent: 'center',
    height: Theme.metrics.getHeightFromDP(80),
    bottom: 0,
  },
  text: {
    color: Theme.colors.subText,
    textAlign: 'center',
    marginTop: Theme.metrics.getHeightFromDP(25),
    fontSize: 16,
    marginHorizontal: Theme.metrics.getWidthFromDP(10),
    fontFamily: 'CircularStd-Medium'
  },
  imageDefault: {
    width: '100%',
    height: '100%',
    bottom: 0,
  },
});

export default InfoEmpty;
