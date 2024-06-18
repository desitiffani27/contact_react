// @flow

import React, {Component} from 'react';
import {TouchableWithoutFeedback, Image, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import {
  ROUTE_NAMES
} from '../../../../utils/CONSTANTS';
import AppTheme from '~/styles';
import Separator from '~/components/common/Separator';
const Container = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('100%')};
  height: auto;
  padding-left: ${({theme, isFirst}) => theme.metrics.largeSize}px;
  padding-right: ${({theme}) => theme.metrics.largeSize}px;
  margin-bottom: 10px;
  align-content: center;
  flex-direction: column;
  justify-content: center;
`;

const ContainerWrapper = styled(View)`
  justify-content: center;
  align-content: center;
  shadow-color: ${({theme}) => theme.colors.lightDarkLayer};
  elevation: 2;
  padding-left: 10px;
  border-radius: 8px;
  background-color: white;
`;

const ContentWrapper = styled(View)`
  flex-direction: row; 
  height: ${({theme}) => theme.metrics.getHeightFromDP('11%')};
`;

const ProjectImage = styled(Image).attrs(({imageURL}) => ({
  source: {uri: imageURL},
}))`
  width: 60px;
  height: 75%;
  border-radius: 125px;
  align-self: center;
`;

const Content = styled(View)`
  flex-direction: column;
  flex: 1;
  padding-start: ${({theme}) => theme.metrics.smallSize}px;
  padding-top: ${({theme}) => theme.metrics.extraSmallSize}px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  justify-content: center;
  align-content: center;
`;

const BottomContentWrapper = styled(View)`
  padding: ${({theme}) => theme.metrics.smallSize}px;
`;

const ProjectTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
})`
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('4.5%')}px;
  font-family: CircularStd-Bold;
  padding: ${({theme}) => theme.metrics.extraSmallSize}px;
  color: ${({theme}) => theme.colors.black};
`;

const TextContent = styled(Text).attrs({
  ellipsizeMode: 'tail',
})`
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('3.5%')}px;
  font-family: CircularStd-medium;
  height: 30px;
  padding: ${({theme}) => theme.metrics.extraSmallSize}px;
  color: ${({theme}) => theme.colors.subText};
`;
const BoxIconText = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${({theme}) => theme.metrics.smallSize}px;
  margin-end: ${({theme}) => theme.metrics.mediumSize}px;
  justify-content: flex-end;
  padding: ${({theme}) => theme.metrics.extraSmallSize}px;
`;
const TextSmall = styled(Text).attrs({
    ellipsizeMode: 'tail',
    numberOfLines: 0,
  })`
    font-size: ${({theme}) => theme.metrics.getWidthFromDP('3.7%')}px;
    font-family: CircularStd-Book;
`;

const ContactCard = props => {
  const {isFirst, item, onDeleteItem} = props;
  const [isImageLoaded, setImageLoaded] = React.useState(false);
  const [isExpanded, setExpanded] = React.useState(false);
  const navigation = useNavigation();

  const onImageLoaded = () => {
    setImageLoaded(true);
  };

  const renderContent = item => {
    return (
      <BottomContentWrapper>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(ROUTE_NAMES.CONTACT_FORM, item);
              }}>
              <BoxIconText>
                  <Icon
                  name="square-edit-outline"
                  style={{marginEnd: 5}}
                  color={AppTheme.colors.green}
                  size={18}
                  />
                  <TextSmall>Edit</TextSmall>
              </BoxIconText>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => onDeleteItem(item.id)}>
              <BoxIconText>
                  <Icon
                  name="delete-outline"
                  style={{marginEnd: 5}}
                  color={AppTheme.colors.red}
                  size={18}
                  />
                  <TextSmall>Delete</TextSmall>
              </BoxIconText>
            </TouchableWithoutFeedback>
        </View>
      </BottomContentWrapper>
    );
  };

  return (
    <Container isFirst={isFirst}>
      <ContainerWrapper>
        <TouchableWithoutFeedback
            onPress={() => {
              setExpanded(!isExpanded);
            }}>
            <ContentWrapper>
              <ProjectImage
                onLoad={() => onImageLoaded()}
                imageURL={
                  item.photo !== "N/A" ? item.photo
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf85N9gWFsDtXFx49oEkzs1CnpPq8x9SFCSg&s'
                  }
              />
              <Content>
                <ProjectTitle>{item.firstName + ' ' + item.lastName}</ProjectTitle>
                <TextContent>Age : {item.age} years</TextContent>
              </Content>
            </ContentWrapper>
        </TouchableWithoutFeedback>
        <Separator/>
        {isExpanded && (renderContent(item))}
      </ContainerWrapper>
    </Container>
  );
};

export default ContactCard;
