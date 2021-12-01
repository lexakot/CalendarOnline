import {all, fork} from 'redux-saga/effects';

import * as authWatchers from './auth';
import * as contactsWatchers from './contacts';
import * as eventsWatchers from './events';

export default function* root() {
  yield all([
    fork(authWatchers.watchLogin),
    fork(authWatchers.watchSendSms),
    fork(authWatchers.watchGetProfile),
    fork(authWatchers.watchLogOut),
    fork(contactsWatchers.watchGetContacts),
    fork(eventsWatchers.watchGetEvents),
  ]);
}
