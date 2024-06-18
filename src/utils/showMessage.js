import {showMessage as message} from 'react-native-flash-message';

const showMessage = data => {
  if (data.error && data.errorMessage !== null) {
    message({
      message: data.errorMessage,
      type: 'danger',
      icon: 'danger',
    });
  }
};

export default showMessage;
