// @flow

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Creators as ContactCreators} from '../../../../store/ducks/contact';
import CustomTextInput from '~/components/common/CustomTextInput';
import Loading from '../../../common/Loading';
import styles from '../EditStyles';
import styled from 'styled-components';
import {showMessage} from 'react-native-flash-message';

const BookingButton = styled(TouchableOpacity)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getHeightFromDP('7%')}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize}px;
  background-color: ${({theme}) => theme.colors.primaryColor};
  flex-direction: row;
`;
const BookingButtonText = styled(Text)`
  color: ${({theme}) => theme.colors.defaultWhite};
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('5%')}px;
  font-family: CircularStd-Black;
`;

class ContactForm extends Component {
  _subscriptionWillFocusEvent = {};

  state = {
    id: null,
    firstName: null,
    lastName: null,
    age: null,
    photo: null
  };

  componentDidMount() {
    const {route} = this.props;

    if (route !== null && typeof route.params !== 'undefined') {
      route.params.age = route.params.age+'';
      this.setState(route.params);
    }
  }

  onDoneContent = content => {
    this.setState({content});
  };

  validator = () => {
    console.log('validator');

    if (!this.state.firstName) {
      this.showFormError('First Name cannot be empty !', 'error');
      return false;
    }
    if (!this.state.lastName) {
      this.showFormError('Last Name cannot be empty !', 'error');
      return false;
    }
    if (!this.state.age) {
      this.showFormError('Age cannot be empty !', 'error');
      return false;
    }
    return true;
  };

  showFormError = (message, type) => {
    // setProgressVisible(false);

    showMessage({
      message: message,
      type: type === 'error' ? 'danger' : 'success',
      icon: type === 'error' ? 'danger' : 'success',
    });
  };

  onClickSubmit = (): void => {
    const {postContactRequest, route, navigation} = this.props;
    this.validator() &&
    postContactRequest(this.state, response =>{
      this.showFormError("Contact successfully saved", 'success');
    });
  };

  render() {
    console.warn(this.state.type);
    if (this.props.contactRequest.loading) {
      return <Loading />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <CustomTextInput
            title={'First Name'}
            placeholder={'Type first name here'}
            value={this.state.firstName}
            onChangeText={firstName => {
              this.setState({firstName});
            }}
          />

          <CustomTextInput
            title={'Last Name'}
            placeholder={'Type last name here'}
            value={this.state.lastName}
            onChangeText={lastName => {
              this.setState({lastName});
            }}
          />

          <CustomTextInput
            title={'Age'}
            placeholder={'Type age here'}
            value={this.state.age}
            keyboardType={'numeric'}
            onChangeText={age => {
              this.setState({age});
            }}
          />

          <CustomTextInput
            title={'Photo URL'}
            placeholder={'Photo URL'}
            value={this.state.photo}
            onChangeText={photo => {
              this.setState({photo});
            }}
          />

          <BookingButton onPress={() => this.onClickSubmit()}>
            <BookingButtonText>Save</BookingButtonText>
          </BookingButton>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  contactRequest: state.contact,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ContactCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactForm);
