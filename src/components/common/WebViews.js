import React, {Component} from 'react';
// import {withNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {CONSTANTS} from '~/utils/CONSTANTS';
class WebViews extends Component {
  static navigationOptions = {
    header: null,
  };
  // componentDidMount() {

  //   navigation.setOptions({tabBarVisible: false});
  // }
  render() {
    const {route} = this.props;
    const {[CONSTANTS.NAVIGATION_PARAM_URI]: uri} = route.params;
    console.log(uri);
    return <WebView source={{uri}} />;
  }
}

export default WebViews;
