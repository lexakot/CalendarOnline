import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

let createReduxStore = createStore;
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export default function configureStore(initialState) {
  const store = createReduxStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
