<template>
  <div class="transit-view">
    <aside class="transit-view__rideshare-section">
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
    </aside>
    <main class="transit-view__metro-section">
      <section class="transit-view__metro-station"></section>
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
    height: 1080px;
    width: 1920px;
    justify-content: stretch;
    &__rideshare-section {
      background-color: #FF0000;
      flex: 1;
    }
    &__rideshare-service {
      background-color: #0000FF;
      padding: 0.5rem;
      margin: 0.5rem;
      height: 216px;
    }
    &__metro-section {
      background-color: #00FF00;
      flex: 1.618 * 3;
    }
  }
}
</style>
