/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import config from './config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wmata: {},
    gcal: [],
  },
  mutations: {
    setWmata(state, wmata) {
      state.wmata = wmata;
    },
    setGCal(state, gcal) {
      state.gcal = gcal;
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
    async fetchGCal(store) {
      const response = await fetch(
        'http://localhost:3000/',
        {
          method: 'get',
        }
      );

      let fakeData = [
        {
          start: '2019-04-25',
          end: '2019-05-07',
          summary: 'Mike OOO',
          name: 'Mike',
          type: 'OOO',
        },
        {
          start: '2019-05-01',
          end: '2019-05-04',
          summary: 'Michael Lovito OOO',
          name: 'Lovito',
          type: 'OOO',
        },
        {
          start: '2019-05-02',
          end: '2019-05-04',
          summary: 'Andrew OOO',
          name: 'Andrew',
          type: 'OOO',
        },
        // {
        //   start: '2019-04-03',
        //   end: '2019-04-03',
        //   summary: 'Steven Remote from his brain',
        //   name: 'Steven',
        //   type: 'Remote',
        // },
      ];

      store.commit('setGCal',  await response.json());
    },
  },
});
