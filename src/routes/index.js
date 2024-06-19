import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {ROUTE_NAMES} from '../utils/CONSTANTS';

import ContactList from '../components/screens/contact/index';
import ContactForm from '../components/screens/contact/screens/ContactForm';
import {
  setDefaultHeaderLayout,
} from '../routes/headerUtils';

const Stack = createStackNavigator();

function AuthStack(isFirstTime) {
  console.log('> not authenticated');
  // AsyncStorage.getItem('isFirstTime').then(isFirstTime => {
  console.log(isFirstTime.isFirstTime, 'isFirstTime');
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTE_NAMES.CONTACT}>
          <Stack.Screen
            name={ROUTE_NAMES.CONTACT}
            component={ContactList}
            options={({navigation}) =>
              setDefaultHeaderLayout(navigation, 'Contact List', 'CircularStd-Book', 20)
            }
          />

          <Stack.Screen
            name={ROUTE_NAMES.CONTACT_FORM}
            component={ContactForm}
            options={({route, navigation}) =>
              setDefaultHeaderLayout(navigation, route.params !=  null ? 'Edit Contact' : 'New Contact', 'CircularStd-Book', 20)
            }
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // });
}

export default AuthStack;
