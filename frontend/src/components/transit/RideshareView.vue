<template>
  <div class="rideshare-view">
    <aside class="rideshare-view__rideshare-section">
      <section class="rideshare-view__rideshare-service">
        <h3>Uber</h3>
        <label>Estimated Arrival</label>
        <span>{{ transitInfo.uber_times && transitInfo.uber_times.UberX }}</span>
        <label>surge multiplier</label>
        <span>{{ transitInfo.uber_times && transitInfo.uber_times.Surge }}</span>
      </section>
      <section class="rideshare-view__rideshare-service">
        <h3>Weather</h3>
        <span>{{ transitInfo.weather && transitInfo.weather.summary }}</span>
        <span>{{ transitInfo.weather && transitInfo.weather.temperature }} ℉</span>
        <label>Precipitation</label>
        <span>{{ transitInfo.weather && transitInfo.weather.precipitation }}</span>
      </section>
    </aside>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'RideshareView',
  computed: {
    ...mapState(['transitInfo']),
  },
  async mounted() {
    this.fetchAll()
    setInterval(this.fetchAll, 30000);
  },
  methods: {
    ...mapActions(['fetchTransitInfo']),
    fetchAll() {
      this.fetchTransitInfo();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@at-root {
  .rideshare-view {
    display: flex;
    flex-direction: column;
    border: 1px solid #fbad35;
    background-color: $midnight-express;
    justify-content: stretch;
    &__rideshare-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.5rem;
    }
    &__rideshare-service {
      @extend .material-box-shadow--level-2;
      background-color: $solitude;
      padding: 0.5rem;
      margin: 0.5rem;
      flex: 1;
      border-radius: 0.75rem;
      display: flex;
      flex-direction: column;
      height: 50%;
      align-self: flex-end;
    }
  }
}
</style>
