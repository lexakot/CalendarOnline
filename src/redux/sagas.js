import {all, fork} from 'redux-saga/effects';

import * as authWatchers from './auth';

export default function* root() {
  yield all([
    fork(authWatchers.watchLogin),
    fork(authWatchers.watchSendSms),
    fork(authWatchers.watchLogOut),
  ]);
}
