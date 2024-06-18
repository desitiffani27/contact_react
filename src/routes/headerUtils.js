import React from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import {CONSTANTS} from '../utils/CONSTANTS';
import appStyles from '../styles';

const hiddenProps = {
  [CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE]: {
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
  },
  [CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE]: {
    headerTintColor: appStyles.colors.primaryColor,
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
  },
};

export const handleHiddenHeaderStyle = (
  route: Object,
  navigation: Object,
  loading: boolean,
  error: boolean,
): void => {
  console.log(route);
  const {
    [CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE]: hasLoadingHeaderStyleParam = false,
    [CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE]: hasHasDataHeaderStyleParam = false,
  } = route.params;

  if (!hasLoadingHeaderStyleParam && loading) {
    navigation.setParams({
      [CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE]: true,
      [CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE]: false,
    });
  }

  if (!hasHasDataHeaderStyleParam && !loading && !error) {
    navigation.setParams({
      [CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE]: true,
      [CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE]: false,
    });
  }
};

const getHiddenProps = (route: Object): Object => {
  const {params} = route;

  let props = {
    headerTintColor: appStyles.colors.primaryColor,
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0,
    },
  };

  if (!!params && params[CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE]) {
    props = hiddenProps[CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE];
  }

  if (!!params && params[CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE]) {
    props = hiddenProps[CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE];
  }

  return props;
};

export const setHiddenHeaderLayout = (route: Object): Object => {
  const props = getHiddenProps(route);

  return {
    headerTintColor: appStyles.colors.defaultWhite,
    ...props,
    headerBackTitle: null,
    title: null,
  };
};

export const setDefaultHeaderLayout = (
  navigation: Object,
  title: string,
  fontFamily: string,
  fontSize: ?number,
) => ({
  title,
  headerTitleStyle: {
    fontSize: fontSize || appStyles.metrics.navigationHeaderFontSize,
    color: appStyles.colors.defaultWhite,
    fontFamily,
  },
  headerTintColor: appStyles.colors.defaultWhite,
  headerStyle: {
    backgroundColor: appStyles.colors.primaryColor,
    borderBottomWidth: 0,
  },
  ...Platform.select({
    android: {
      headerStyle: {
        backgroundColor: appStyles.colors.primaryColor,
        elevation: 4,
      },
    },
  }),
  headerBackTitle: null,
  borderBottomWidth: 0,
});

export const HeaderRigthDoneButton = ({onPress, disable}) => {
  return (
    <View>
      <Icon
        type="material"
        name="done"
        size={appStyles.metrics.exlargeRS}
        iconStyle={{
          color: disable
            ? appStyles.colors.inactiveDone
            : appStyles.colors.defaultWhite,
        }}
        containerStyle={styles.buttonDone}
        onPress={onPress}
        disabled={disable}
      />
    </View>
  );
};

export const HeaderRightShareButton = ({onPress, disable}) => {
  return (
    <View>
      <Icon
        type="material"
        name="share"
        size={appStyles.metrics.exlargeRS}
        iconStyle={{
          color: disable
            ? appStyles.colors.inactiveDone
            : appStyles.colors.defaultWhite,
        }}
        containerStyle={styles.buttonDone}
        onPress={onPress}
        disabled={disable}
      />
    </View>
  );
};

export const HeaderRightAddButton = ({onPress, disable}) => {
  return (
    <View>
      <Icon
        type="material"
        name="person-add"
        size={appStyles.metrics.exlargeRS}
        iconStyle={{
          color: disable
            ? appStyles.colors.inactiveDone
            : appStyles.colors.defaultWhite,
        }}
        containerStyle={styles.buttonDone}
        onPress={onPress}
        disabled={disable}
      />
    </View>
  );
};

export const HeaderRightButton = ({onSearch, isOnSearch}) => {
  return (
    <View style={{flexDirection: 'row', height: '100%'}}>
      <Icon
        type="material-community"
        name="magnify"
        size={appStyles.metrics.largeRS}
        iconStyle={{
          color: isOnSearch
            ? appStyles.colors.primaryColor
            : appStyles.colors.white,
        }}
        containerStyle={[
          styles.buttonRight,
          isOnSearch && styles.buttonRightActive,
        ]}
        onPress={onSearch}
      />
      <Icon
        type="material-community"
        name="bell"
        size={appStyles.metrics.largeRS}
        iconStyle={{color: appStyles.colors.white}}
        containerStyle={styles.buttonRight}
      />
      <Icon
        type="material-community"
        name="dots-vertical"
        size={appStyles.metrics.largeRS}
        iconStyle={{color: appStyles.colors.white}}
        containerStyle={styles.buttonRight}
      />
    </View>
  );
};
export const HeaderLeftClose = (
  navigation: Object,
  title: string,
  fontFamily: string,
  fontSize: ?number,
) => ({
  title,
  headerTitleStyle: {
    fontSize: fontSize || appStyles.metrics.navigationHeaderFontSize,
    color: appStyles.colors.defaultWhite,
    fontFamily,
    textAlign: 'center',
  },
  headerTintColor: appStyles.colors.defaultWhite,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: appStyles.colors.primaryColor,
    borderBottomWidth: 0,
  },
  ...Platform.select({
    android: {
      headerStyle: {
        backgroundColor: appStyles.colors.primaryColor,
        elevation: 4,
      },
    },
  }),
  headerBackTitle: null,
  borderBottomWidth: 0,
  headerLeft: () => {
    return (
      <View>
        <Icon
          type="material"
          name="close"
          size={appStyles.metrics.exlargeRS}
          iconStyle={{color: appStyles.colors.white}}
          containerStyle={styles.buttonDone}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  },
});
const styles = StyleSheet.create({
  buttonRight: {
    paddingRight: appStyles.metrics.mediumSize,
    paddingLeft: appStyles.metrics.mediumSize,
    justifyContent: 'center',
    flex: 1,
  },
  buttonRightActive: {
    backgroundColor: appStyles.colors.white,
  },
  buttonDone: {
    paddingRight: appStyles.metrics.largeSize,
    paddingLeft: appStyles.metrics.largeSize,
    justifyContent: 'center',
    flex: 1,
  },
});
