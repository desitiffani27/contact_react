import React from 'react';
import {ActivityIndicator, Platform, View, StyleSheet} from 'react-native';

import appStyles from '~/styles';

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
  },
});

const Loading = () => (
  <View style={styles.loadingWrapper}>
    <ActivityIndicator
      size={Platform.OS === 'ios' ? 'small' : 'large'}
      color={appStyles.colors.primaryColor}
    />
  </View>
);

export const LoadingOverlay = () => (
  <View style={styles.loadingOverlay}>
    <ActivityIndicator
      size={Platform.OS === 'ios' ? 'small' : 'large'}
      color={appStyles.colors.primaryColor}
    />
  </View>
);

export default Loading;
