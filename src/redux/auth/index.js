import {call, put, takeEvery} from 'redux-saga/effects';
import http from '../../services/http';
import TokenStorage from '../../services/storage/token';

import Axios from 'axios';

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
  code: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, loading: true};
    case LOGIN_SUCCESS:
      return {...state, loading: false, authenticated: true, code: action.code};
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
    const {data} = yield call(http.post, '/api/Identity/getOTP', {
      PhoneNumber: `375${payload}`,
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const params = new URLSearchParams();
    params.append('client_id', 'phone_number_authentication');
    params.append('grant_type', 'phone_number_token');
    params.append('phone_number', `375${payload}`);
    params.append('verification_token', data.verify_token);
    params.append('client_secret', 'secret');
    params.append('scope', 'myapi');
    const {data: loginData} = yield call(
      Axios.post,
      'http://178.250.159.105/connect/token',
      params,
      config,
    );
    console.log('loginData', loginData);
    yield call(TokenStorage.save, loginData.access_token);
    alert(data.verify_token);
    yield put({
      type: LOGIN_SUCCESS,
      code: data.verify_token,
    });
  } catch (err) {
    alert('Error');
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
