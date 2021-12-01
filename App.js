import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './src/redux/configureStore';
import Screens from './Screens';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Screens />
    </Provider>
  );
};

export default App;
