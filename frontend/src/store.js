/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import config from './config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wmata: {},
  },
  mutations: {
    setWmata(state, wmata) {
      state.wmata = wmata;
    },
  },
  actions: {
    async fetchWmata(store) {
      const response = await fetch(
        'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/C03',
        {
          method: 'get',
          headers: {
            api_key: config.wmataApiKey,
          },
        },
      );
      store.commit('setWmata', await response.json());
    },
  },
});
