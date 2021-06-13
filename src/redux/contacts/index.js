import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {call, put, takeEvery} from 'redux-saga/effects';
import http from '../../services/http/api';

const GET_CONTACTS_REQUEST = 'contacts/GET_CONTACTS_REQUEST';
const GET_CONTACTS_SUCCESS = 'contacts/GET_CONTACTS_SUCCESS';
const GET_CONTACTS_FAILURE = 'contacts/GET_CONTACTS_FAILURE';

export const initialState = {
  contacts: [],
  syncContacts: [],
  loading: false,
  permissionsError: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CONTACTS_REQUEST:
      return {...state, loading: true};
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.contacts,
        syncContacts: action.syncContacts,
      };
    case GET_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        permissionsError: action.permissionsError,
      };

    default:
      return state;
  }
}

// <<<ACTIONS>>>
export const getContactsRequest = () => ({
  type: GET_CONTACTS_REQUEST,
});

// <<<WORKERS>>>
function* getContacts() {
  try {
    const request = yield call(PermissionsAndroid.requestMultiple, [
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
    ]);
    if (request['android.permission.READ_CONTACTS'] === 'granted') {
      const res = yield call(Contacts.getAll);
      const filtered = res.filter(c => c.phoneNumbers.length);
      const formatted = filtered.map(c => ({
        ...c,
        formattedPhone: c.phoneNumbers[0].number
          .replace(/\s/g, '')
          .replace('+', '')
          .replace(new RegExp('-', 'g'), ''),
      }));
      console.log('res', res);
      const phoneNumbers = formatted.map(c => c.formattedPhone);

      const {data} = yield call(
        http.post,
        '/api/Contacts/get-contacts',
        phoneNumbers,
      );

      const findSyncContacts = formatted
        .map(c => {
          const f = data.find(t => t.PhoneNumber === c.formattedPhone);
          if (f?.IsExisted) {
            return c;
          }
        })
        .filter(k => k !== undefined);

      yield put({
        type: GET_CONTACTS_SUCCESS,
        contacts: formatted,
        syncContacts: findSyncContacts,
      });
    } else {
      yield put({
        type: GET_CONTACTS_FAILURE,
        permissionsError: true,
      });
    }
  } catch (err) {
    console.log('errorr', err);
  }
}

// <<<WATCHERS>>>
export function* watchGetContacts() {
  yield takeEvery(GET_CONTACTS_REQUEST, getContacts);
}
