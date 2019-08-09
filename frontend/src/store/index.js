/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import config from './config';

Vue.use(Vuex);

export default () => new Vuex.Store({
  state: {
    gcal: [],
    gcalRemote: [],
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
      state.k8s = { deployments };
    },
    setCommits(state, newCommits) {
      state.commits = newCommits;
    },
    setGCal(state, gcal) {
      state.gcal = gcal;
    },
    setGCalRemote(state, gcalRemote) {
      state.gcalRemote = gcalRemote;
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
        'http://localhost:3001/deployments',
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
    async fetchGCal(store) {
      const response = await fetch(
        'http://localhost:3000/gcal',
        {
          method: 'get',
        },
      );

      // let fakeData = [
      //   {
      //     start: '2019-04-25',
      //     end: '2019-05-07',
      //     summary: 'Mike OOO',
      //     name: 'Mike',
      //     type: 'OOO',
      //   },
      //   {
      //     start: '2019-05-01',
      //     end: '2019-05-04',
      //     summary: 'Michael Lovito OOO',
      //     name: 'Lovito',
      //     type: 'OOO',
      //   },
      //   {
      //     start: '2019-05-02',
      //     end: '2019-05-04',
      //     summary: 'Andrew OOO',
      //     name: 'Andrew',
      //     type: 'OOO',
      //   },
      //   {
      //     start: '2019-04-03',
      //     end: '2019-04-03',
      //     summary: 'Steven Remote from his brain',
      //     name: 'Steven',
      //     type: 'Remote',
      //   },
      // ];

      const data = await response.json();

      store.commit('setGCal', data);
    },
    async fetchGCalRemote(store) {
      const response = await fetch(
        'http://localhost:3000/gcal?type=wfh',
        {
          method: 'get',
        },
      );

      // let fakeData = [
      //   {
      //     start: '2019-07-10',
      //     end: '2019-07-15',
      //     summary: 'Mike OOO',
      //     name: 'Mike',
      //     type: 'OOO',
      //   },
      //   {
      //     start: '2019-07-01',
      //     end: '2019-07-13',
      //     summary: 'Michael Lovito OOO',
      //     name: 'Lovito',
      //     type: 'OOO',
      //   },
      //   {
      //     start: '2019-07-02',
      //     end: '2019-07-24',
      //     summary: 'Andrew OOO',
      //     name: 'Andrew',
      //     type: 'OOO',
      //   },
      // {
      //   start: '2019-07-03',
      //   end: '2019-08-03',
      //   summary: 'Steven Remote from his brain',
      //   name: 'Steven',
      //   type: 'Remote',
      // },
      // ];

      const data = await response.json();

      store.commit('setGCalRemote', data);
    },
    async function fetchGcalWFH() {

    }
  },
});
