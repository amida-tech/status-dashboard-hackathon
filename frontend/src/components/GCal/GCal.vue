<template>
  <div class="gcal">
    <div class="ooo-container" v-if="computeOutOfOffice.length > 0" >
      <span class="gcal-title">Out Of Office</span>
      <Row v-bind:data="computeOutOfOffice"/>
    </div>

 <div v-if="computeOutOfOffice.length <= 0">
      <span class="gcal-title">Out Of Office</span>
      <p>Everyone's Working I Guess ¯\_(ツ)_/¯</p>
    </div>

    <div class="remote-container" v-if="computeRemote.length > 0">
      <span class="gcal-title">Remote</span>
      <Row v-bind:data="computeRemote"/>
    </div>

    <div v-if="computeRemote.length <= 0">
      <span class="gcal-title">Remote</span>
      <p>Everyone's Here I guess ¯\_(ツ)_/¯</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Row from './Row.vue';

export default {
  name: 'GCal',
  components: {
    Row,
  },
  computed: {
    ...mapState(['gcal']),
    computeRemote() {
      return this.gcal.filter(event => event.type === 'Remote');
    },
    computeOutOfOffice() {
      return this.gcal.filter(event => event.type === 'OOO');
    },
  },
  async mounted() {
    this.fetchGCal();
    setInterval(this.fetchGCal, 30000);
  },
  methods: {
    ...mapActions(['fetchGCal']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .gcal {
      display: grid;
      grid-template-rows: 50% 50%;
      width: 100%;
      height: 100%;
    }
    .ooo-container {
       grid-row-start: 1;
    }
    .remote-container {
      grid-row-start:  2;
    }

    .gcal-title {
      color: #F5F7FA
    }
</style>
