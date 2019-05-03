/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import config from './config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wmata: {
      A03: [],
      A02: [],
      C03: [],
    },
    k8s: {
      deployments: [],
    },
    commits: [],
    transitInfo: {},
  },
  mutations: {
    setStationTrains(state, trains) {
      state.wmata = { ...state.wmata, [trains.stationID]: trains.trains };
    },
    setTransitInfo(state, transitInfo) {
      state.transitInfo = transitInfo;
    },
    setK8s(state, deployments) {
      state.k8s = {deployments: deployments};
    },
    setCommits(state, newCommits) {
      state.commits = newCommits;
    },
  },
  actions: {
    async fetchTrainsByStation(store, stationID) {
      const response = await fetch(
        `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${stationID}`,
        {
          method: 'get',
          headers: {
            api_key: config.wmataApiKey,
          },
        },
      );
      store.commit('setStationTrains', { trains: (await response.json()).Trains, stationID });
    },
    async fetchTransitInfo(store) {
      const response = await fetch(
        `${config.transitUrl}/current_transit`,
        {
          method: 'get',
        },
      );
      store.commit('setTransitInfo', await response.json());
    },
    async fetchK8s(store) {
      const response = await fetch(
        'http://192.168.0.163:3000/deployments',
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
      store.commit('setCommits', await response.json());
    },
  },
});
