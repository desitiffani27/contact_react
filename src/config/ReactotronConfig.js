import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

// if (__DEV__) {
const reactotron = Reactotron.configure({name: 'Sembuh', host: '192.168.0.18'})
  .useReactNative()
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect();

reactotron.clear();

// console.reactotron = reactotron;
// }
export default reactotron;
