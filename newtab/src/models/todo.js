import * as photos from '../services/photo';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export default {

  namespace: 'todo',

  state: {
    items: [],
    inputBuffer: '',
    olditems: [],
    bg: '',
    clientid: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      setTimeout(() => {
        dispatch({ type: 'clean' });
      }, 100);
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *clean({ payload }, { call, put, select }) {
      const clientid = yield select(state => state.todo.clientid);
      const { data } = yield call(photos.query, { clientid });
      yield put({ type: 'bg', payload: data });
    },
  },

  reducers: {
    clean(state) {
      const items = state.items.filter((item) => {
        return item.state === 1;
      });
      const olditems = state.olditems.concat(state.items.filter((item) => {
        return item.state === 0;
      }));
      let clientid = state.clientid;
      if (!clientid) {
        clientid = guid();
      }
      return { ...state, clientid, items, olditems };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
    buffer(state, { payload }) {
      return { ...state, inputBuffer: payload };
    },
    bg(state, { payload }) {
      return { ...state, bg: payload.data.photo.url };
    },
    add(state, { payload }) {
      const item = {
        state: 1,
        cnt: payload,
        createat: new Date(),
      };
      return { ...state, items: state.items.concat([item]) };
    },
    state(state, { payload }) {
      const items = state.items.concat([]);
      items[payload].state = 1 - items[payload].state;
      items[payload].modifiedat = new Date();
      return { ...state, items };
    },
  },

};
