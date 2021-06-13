import {combineReducers} from 'redux';

import auth from './auth';
import contacts from './contacts';
import events from './events';

const rootReducer = combineReducers({
  auth,
  contacts,
  events,
});

export default rootReducer;
