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
  },

  reducers: {
    clean(state) {
      const items = state.items.filter((item) => {
        return item.state === 1;
      });
      let clientid = state.clientid;
      if (!clientid) {
        clientid = guid();
      }
      return { ...state, clientid, items };
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
