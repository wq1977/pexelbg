
export default {

  namespace: 'todo',

  state: {
    items: [],
    inputBuffer: '',
    olditems: [],
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
  },

  reducers: {
    clean(state) {
      const items = state.items.filter((item) => {
        return item.state === 1;
      });
      const olditems = state.olditems.concat(state.items.filter((item) => {
        return item.state === 0;
      }));
      return { ...state, items, olditems };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
    buffer(state, { payload }) {
      return { ...state, inputBuffer: payload };
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
