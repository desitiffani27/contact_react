import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';
import reducers from './ducks';
import Reactotron from '../config/ReactotronConfig';

const initialState = {};
const sagaMonitor = __DEV__ ? Reactotron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({sagaMonitor});

let middlewares = [];
middlewares.push(sagaMiddleware);

console.log(__DEV__ ? 'dev' : 'nope');
if (__DEV__) {
  //middlewares.push(createLogger());
}

let middleware = applyMiddleware(...middlewares);

const enhancer = compose(middleware);

//const createAppropriateStore = __DEV__ ? Reactotron.createStore : createStore;
const store = createStore(reducers, initialState, enhancer);

sagaMiddleware.run(sagas);

export default store;
