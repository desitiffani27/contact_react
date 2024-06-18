/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Platform, StatusBar, Alert, Linking, LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {ThemeProvider} from 'styled-components';
import {AuthContext} from './src/context';
import AppTheme from './src/styles';
import NotAuthenticatedContainer from './src/routes';
import api, {setClientToken, URI} from './src/services/api';
import store from './src/store';
import NotifService from '~/utils/NotifService';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
  persistItemInStorage,
  getItemFromStorage,
} from '~/utils/AsyncStorageManager';
import {ROUTE_NAMES, CONSTANTS, ASYNC_KEY} from '~/utils/CONSTANTS';

import env from 'react-native-config';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import { BackHandler } from 'react-native';
import { checkVersion } from "react-native-check-version";

export default function App() {
  const UNAUTHORIZED = 401;
  const NOT_FOUND = 404;

  const [isFirstTime, setIsFirsTime] = React.useState('1');
  React.useEffect(() => {
    console.log('WEB_CLIENT_ID', env.WEB_CLIENT_ID);
    GoogleSignin.configure({
      webClientId: env.WEB_CLIENT_ID,
    });
  }, []);
  
  const authContext = React.useMemo(
    () => ({}),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={AppTheme.colors.primaryColor}
          barStyle="light-content"
          translucent
        />
        <ThemeProvider theme={AppTheme}>
          <Provider store={store}>
            <NotAuthenticatedContainer isFirstTime={isFirstTime} />
          </Provider>  
          <FlashMessage
            duration={5000}
            position={
              Platform.OS === 'ios' ? 'bottom' : {bottom: 0}
            }
          />
        </ThemeProvider>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
