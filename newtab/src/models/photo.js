import * as photos from '../services/photo';

export default {

  namespace: 'photo',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      setTimeout(() => {
        dispatch({ type: 'init' });
      }, 100);
    },
  },

  effects: {
    *init({ payload }, { call, put, select }) {  // eslint-disable-line
      const bg = yield select(state => state.photo.bg);
      const clientid = yield select(state => state.todo.clientid);
      if (!bg) {
        const { data } = yield call(photos.query, { clientid });
        yield put({ type: 'bg', payload: data.data.photo.url });
      } else {
        const nextbg = yield select(state => state.photo.nextbg);
        yield put({ type: 'bg', payload: nextbg });
      }
      const { data } = yield call(photos.query, { clientid });
      yield put({ type: 'nextbg', payload: data.data.photo.url });
    },
  },

  reducers: {
    bg(state, { payload }) {
      return { ...state, bg: payload };
    },
    nextbg(state, { payload }) {
      return { ...state, nextbg: payload };
    },
  },

};
