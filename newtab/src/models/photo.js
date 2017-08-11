import * as photos from '../services/photo';

export default {

  namespace: 'photo',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      setTimeout(() => {
        dispatch({ type: 'fetch' });
      }, 100);
    },
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {  // eslint-disable-line
      const clientid = yield select(state => state.todo.clientid);
      const { data } = yield call(photos.query, { clientid });
      yield put({ type: 'bg', payload: data });
    },
  },

  reducers: {
    bg(state, { payload }) {
      return { ...state, bg: payload.data.photo.url };
    },
  },

};
