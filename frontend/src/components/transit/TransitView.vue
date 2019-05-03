<template>
  <div class="transit-view">
    <aside class="transit-view__rideshare-section">
      <section class="transit-view__rideshare-service">
        <h2>Uber</h2>
        <label>Estiamted arrival time</label>
        <span>4minutes</span>
        <label>surge multiplier</label>
        <span>1.2x</span>
      </section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
    </aside>
    <main class="transit-view__metro-section">
      <section class="transit-view__metro-station">
        <h2>Dupont Circle</h2>
        <ul>
          <label>Service Alerts</label>
          <li>Due to fire dept activity at Mississippi Ave & 21st St SE, buses may experience delays in both directions.</li>
        </ul>
      </section>
      <section class="transit-view__metro-station"></section>
      <section class="transit-view__metro-station"></section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'TransitView',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@at-root {
  .transit-view {
    display: flex;
    flex-direction: row;
    border: 1px solid #fbad35;
    background-color: $lightest-gray;
    height: 1080px;
    width: 1920px;
    justify-content: stretch;
    &__rideshare-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0.5rem 0.25rem 0.5rem 0.5rem;
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
    }
    &__metro-section {
      flex: 1;
      display: flex;
      flex-direction: row;
      padding: 0.5rem 0.5rem 0.5rem 0.25rem;
      flex: 1.618 * 3;
    }
    &__metro-station {
      @extend .material-box-shadow--level-2;
      background-color: $solitude;
      padding: 0.5rem;
      margin: 0.5rem;
      border-radius: 0.75rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
