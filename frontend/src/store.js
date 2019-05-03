/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import config from './config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wmata: {},
    k8s: {},
    commits: [],
  },
  mutations: {
    setWmata(state, wmata) {
      state.wmata = wmata;
    },
    setK8s(state, newState) {
      state.k8s = newState;
    },
    setCommits(state, newCommits) {
      state.commits = newCommits;
    }
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
    async fetchK8s(store) {
      const response = await fetch(
        'http://192.168.0.64:3000/deployments',
        {
          method: 'get',
          headers: {
          },
        },
      );
      store.commit('setK8s', await response.json());
    },
    async fetchCommits(store) {
      const response = await fetch(
        'http://192.168.0.64:3000/commits',
        {
          method: 'get',
          headers: {
          },
        },
      );
      store.commit('setCommits', await response.json())
    },
  },
});
