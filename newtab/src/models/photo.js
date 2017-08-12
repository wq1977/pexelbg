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
      const nextbg = yield select(state => state.todo.nextbg);
      const clientid = yield select(state => state.todo.clientid);
      if (!nextbg) {
        const { data } = yield call(photos.query, { clientid });
        yield put({ type: 'bg', payload: data.data.photo.url });
      } else {
        yield put({ type: 'bg', payload: nextbg });
      }
      const { data } = yield call(photos.query, { clientid });
      yield put({ type: 'todo/nextbg', payload: data.data.photo.url });
    },
  },

  reducers: {
    bg(state, { payload }) {
      return { ...state, bg: payload };
    },
  },

};
