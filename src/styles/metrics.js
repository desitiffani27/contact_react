import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const percentageCalculation = (max, val) => max * (val / 100);

const getWidthFromDP = widthPercentage => {
  const percentageDesired = parseFloat(widthPercentage);
  const widthPercentageToDP = PixelRatio.roundToNearestPixel(
    percentageCalculation(width, percentageDesired),
  );

  return widthPercentageToDP;
};

const getHeightFromDP = heightPercentage => {
  const percentageDesired = parseFloat(heightPercentage);
  const heightPercentageToDP = PixelRatio.roundToNearestPixel(
    percentageCalculation(height, percentageDesired),
  );

  return heightPercentageToDP;
};

const getResponsiveSize = val => {
  const percentageDesired = parseFloat(val);
  const widthDimension = height > width ? width : height;
  const aspectRatioBasedHeight = (16 / 9) * widthDimension;
  return percentageCalculation(
    Math.sqrt(
      Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2),
    ),
    percentageDesired,
  );
};

export default {
  statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
  navigationHeaderHeight: Platform.OS === 'ios' ? 64 : 54,
  borderRadius: 8,

  navigationHeaderFontSize: Platform.OS === 'ios' ? 17 : 19,

  extraSmallSize: getWidthFromDP('1%'),
  smallSize: getWidthFromDP('2%'),
  mediumSize: getWidthFromDP('3%'),
  largeSize: getWidthFromDP('4%'),
  extraLargeSize: getWidthFromDP('5%'),

  extraSmallRS: getResponsiveSize(1),
  smallRS: getResponsiveSize(1.5),
  regularRS: getResponsiveSize(2),
  largeRS: getResponsiveSize(3),
  extraLargeRS: getResponsiveSize(4),

  getWidthFromDP,
  getHeightFromDP,
  getResponsiveSize,

  width,
  height,
};
