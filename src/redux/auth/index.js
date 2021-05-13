import {call, put, takeEvery} from 'redux-saga/effects';

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE';

const SEND_SMS_REQUEST = 'auth/SEND_SMS_REQUEST';
const SEND_SMS_SUCCESS = 'auth/SEND_SMS_SUCCESS';
const SEND_SMS_FAILURE = 'auth/SEND_SMS_FAILURE';

export const initialState = {
  authenticated: false,
  loading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, loading: true};
    case LOGIN_SUCCESS:
      return {...state, loading: false, authenticated: true};
    case LOGIN_FAILURE:
      return {...state, loading: false};

    case LOGOUT_SUCCESS:
      return {...state, loading: false, authenticated: false};

    case SEND_SMS_REQUEST:
      return {...state, loading: true};
    case SEND_SMS_SUCCESS:
      return {...state, loading: false, sended: true};
    case SEND_SMS_FAILURE:
      return {...state, loading: false};
    default:
      return state;
  }
}

// <<<ACTIONS>>>
export const loginRequest = payload => ({
  type: LOGIN_REQUEST,
  payload,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const sendSmsRequest = payload => {
  return {
    type: SEND_SMS_REQUEST,
    payload,
  };
};

// <<<WORKERS>>>
function* login({payload}) {
  try {
    console.log('login');
  } catch (err) {
    console.log('err', err);
  }
}

function* logOut() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* sendSms({payload}) {
  try {
    console.log('sendSms');
  } catch (err) {
    console.log('SEND-SMS-ERROR ', err);
    yield put({
      type: SEND_SMS_FAILURE,
    });
  }
}

// <<<WATCHERS>>>
export function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST, login);
}

export function* watchLogOut() {
  yield takeEvery(LOGOUT_REQUEST, logOut);
}

export function* watchSendSms() {
  yield takeEvery(SEND_SMS_REQUEST, sendSms);
}
