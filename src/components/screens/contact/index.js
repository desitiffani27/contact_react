// @flow

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  FlatList, 
  View, 
  StyleSheet, 
  RefreshControl,
  Alert
} from 'react-native';
import Loading from '~/components/common/Loading';
import InfoEmpty from '~/components/common/InfoEmpty';
import AppTheme from '~/styles';
import {showMessage} from 'react-native-flash-message';
import {HeaderRightAddButton} from '~/routes/headerUtils';
import ContactCard from './components/ContactCard';
import {Creators as ContactCreators} from '~/store/ducks/contact';
import styled from 'styled-components';
import {ROUTE_NAMES, CONSTANTS} from '~/utils/CONSTANTS';
import SplashScreen from 'react-native-splash-screen';

const Container = styled(View)`
  justify-content: space-between;
  width: 100%;
  height: 100%;
  flex:1;
`;
const ListWrapper = styled(View)`
  height: ${({theme}) => theme.metrics.getHeightFromDP('88%')}px;
`;

class ContactList extends Component {
  _subscriptionWillFocusEvent = {};
  state = {
    isRefreshing: false,
    contactList: [],
    oldList: [],
  };
  componentDidMount = async () => {
    SplashScreen.hide();
    console.log('> ContactList->componentDidMount: ');
    const {navigation, route} = this.props;

    this.requestData([]);

    this.renderHeaderRightButton();
  }

  renderHeaderRightButton = disable => {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderRightAddButton
            onPress={() => {
              this.props.navigation.navigate(ROUTE_NAMES.CONTACT_FORM);
            }}
          />
        );
      },
    });
  };

  requestData = (oldList) => {
    console.log('> requestData->getContactListRequest');
    const {getContactListRequest} = this.props;
    getContactListRequest(oldList);
  };

  static getDerivedStateFromProps(props, state) {
    const {contactListRequest} = props;
    const {error: error1, errorMessage: errorMessage1} = contactListRequest;

    if (error1 && errorMessage1 !== null) {
      showMessage({
        message: errorMessage1,
        type: 'danger',
        icon: 'danger',
      });
    }

    return {
      isRefreshing: false,
    };
  }

  renderNullData = () => {
    return (
      <InfoEmpty
        scrollEnabled
        title={'Sorry, you have no contacts!'}
        refreshing={this.state.isRefreshing}
        onRefresh={this.onRefreshItem}
      />
    );
  };

  onRefreshItem = () => {
    const {tabItemSelected} = this.state;
    console.log('REFRESHH', tabItemSelected);
    this.requestData([]);
    this.setState({page: 1, offset: 1, contactList: []});
  };

  deleteItem = (id) => {
    const {deleteContactRequest} = this.props;

    Alert.alert('Confirmation', 'Are you sure want to delete this contact?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        deleteContactRequest({contactId: id}, response =>{
          this.onRefreshItem();
        });
      }},
    ]);
    
  };

  render() {
    console.log('> Contact Form->render');
    const {contactListRequest} = this.props;
    const dataset = contactListRequest.contactList;
    this.state.oldList = contactListRequest.contactList;

    if (this.props.contactListRequest.loading) {
      return <Loading />;
    }

    return (
      <Container>
        { contactListRequest.contactList.length > 0 && (
          <ListWrapper>
            <FlatList
              renderItem={({item, index}) => {
                return <ContactCard 
                          onDeleteItem={this.deleteItem}
                          item={item} 
                          isFirst={index === 0} />;
              }}
              numColumns={1}
              contentContainerStyle={{
                paddingTop: 10,
              }}
              refreshControl={
                <RefreshControl
                  progressViewOffset={0}
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefreshItem}
                />
              }
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={contactListRequest.contactList}
            />
          </ListWrapper>
        )} 

        { contactListRequest.contactList.length == 0 && contactListRequest.isLoading && 
          this.renderNullData()
        }
      </Container>
    );
  }
}
const stylesComponent = StyleSheet.create({
  listItem: {
    flex: 1,
    height: '100%',
    paddingBottom: AppTheme.metrics.mediumSize,
  },

  // Text
  textTopQuestion: {
    color: AppTheme.colors.black,
    fontSize: 18,
    padding: AppTheme.metrics.largeSize,
  },

  container: isStart => {
    return {
      paddingStart: isStart
        ? AppTheme.metrics.largeSize
        : AppTheme.metrics.smallSize,
      paddingEnd: AppTheme.metrics.smallSize,
    };
  },
  containerButton: enable => {
    return [
      {
        padding: AppTheme.metrics.mediumSize,
        borderRadius: AppTheme.metrics.mediumSize,
      },
      enable
        ? {backgroundColor: AppTheme.colors.primaryColor}
        : {borderColor: AppTheme.colors.primaryColor, borderWidth: 1},
    ];
  },

  // Text
  textButton: enable => {
    return [
      {color: AppTheme.colors.primaryColor},
      enable && {color: AppTheme.colors.white},
    ];
  },
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(ContactCreators, dispatch);

const mapStateToProps = state => ({
  contactListRequest: state.contact,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactList);
