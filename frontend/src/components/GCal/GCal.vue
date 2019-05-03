<template>
  <div class="gcal">
    <div class="ooo-container" v-if="computeOutOfOffice.length > 0" >
      <p>Out Of Office</p>
      <Row/>
    </div>
    <div class="remote-container" v-if="computeRemote.length > 0">
      <p>Remote</p>
      <Row/>
    </div>
  </div>
</template>

<script>
import Row from './Card';
import { mapActions, mapState } from 'vuex';


export default {
  name: 'GCal',
  components: {
    Row,
  },
  computed: {
    ...mapState(['gcal']),
    computeRemote() {
      return this.gcal.filter(event => event.type === "Remote");
    },
     computeOutOfOffice() {
      return this.gcal.filter(event => event.type === "OOO");
    }
  },
    async mounted() {
      this.fetchGCal();
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
      width: 1280;
      height: 800;
    }
    
</style>
