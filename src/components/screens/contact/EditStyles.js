import {StyleSheet} from 'react-native';
import styles from '~/styles';

export default StyleSheet.create({
  // View
  container: {
    flex: 1,
    padding: styles.metrics.extraLargeSize,
  },
  containerAvatar: {
    alignItems: 'center',
  },

  // Image
  imageAvatar: {
    width: styles.metrics.getWidthFromDP('35%'),
    height: styles.metrics.getWidthFromDP('35%'),
    borderRadius: styles.metrics.getWidthFromDP('35%') / 2,
    marginTop: styles.metrics.getHeightFromDP('3%'),
    marginBottom: styles.metrics.getHeightFromDP('2%'),
    overflow: 'hidden',
    resizeMode: 'cover',
  },

  imageArticle: {
    width: styles.metrics.getWidthFromDP('90%'),
    height: styles.metrics.getWidthFromDP('35%'),
    marginTop: styles.metrics.getHeightFromDP('3%'),
    marginBottom: styles.metrics.getHeightFromDP('2%'),
    overflow: 'hidden',
    resizeMode: 'cover',
  },

  // Text
  textChangeImage: {
    marginBottom: styles.metrics.getHeightFromDP('4%'),
    color: styles.colors.blue,
    fontSize: 16,
  },
});
