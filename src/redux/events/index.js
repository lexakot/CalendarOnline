import {call, put, takeEvery} from 'redux-saga/effects';
import moment from 'moment';
import http from '../../services/http/api';

const GET_EVENTS_REQUEST = 'events/GET_EVENTS_REQUEST';
const GET_EVENTS_SUCCESS = 'events/GET_EVENTS_SUCCESS';
const GET_EVENTS_FAILURE = 'events/GET_EVENTS_FAILURE';

export const initialState = {
  events: [],
  loading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return {...state, loading: true};
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.events,
      };
    case GET_EVENTS_FAILURE:
      return {...state, loading: false};

    default:
      return state;
  }
}

// <<<ACTIONS>>>
export const getEventsRequest = date => ({
  type: GET_EVENTS_REQUEST,
  date,
});

// <<<WORKERS>>>
function* getEvents({date = moment().format('YYYY-MM-DD')}) {
  try {
    const {data} = yield call(http.get, `/api/Events/${date}/byDate`);
    console.log('events', data);
    yield put({
      type: GET_EVENTS_SUCCESS,
      events: data,
    });
  } catch (err) {
    console.log('errorr', err);
  }
}

// <<<WATCHERS>>>
export function* watchGetEvents() {
  yield takeEvery(GET_EVENTS_REQUEST, getEvents);
}
