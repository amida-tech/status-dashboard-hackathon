<template>
  <div class="app">
    <section class="app_header">
    </section>
    <section class="app__body">
      <section class="app__body-sidebar">
        <k8sView/>
      </section>
      <section class="app__body-main">
        <section class="app__body-top">
          <section class="app__body-top-left">
          <GCal/>
          </section>
          <section class="app__body-top-right">
          <Clock />
          <!-- <RideshareView /> -->
          </section>
        </section>
        <section class="app__body-bottom">
        <TransitView />
        </section>
      </section>
    </section>
  </div>
</template>

<script>

import GCal from './components/GCal/GCal.vue';
import k8sView from './components/k8sView.vue';
import Clock from './components/Clock.vue'
// import SemanticElements from './components/examples/SemanticElements.vue';
import TransitView from './components/transit/TransitView.vue';
import RideshareView from './components/transit/RideshareView.vue';

export default {
  name: 'app',
  components: {
    GCal,
    k8sView,
    // SemanticElements,
    TransitView,
    RideshareView,
    Clock,
  },
};
</script>

<style lang="scss">
.app {
  height: 1080px;
  width: 1920px;

  display: flex;
  flex-direction: column;


  &__header {
    overflow: hidden;
  }
  &__body {
    flex: 15;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  &__body-sidebar {
    background-color: purple;
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
  &__body-main {
    height: 100%;
    flex: 5;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  &__body-top {
    background-color: $midnight-express;
    width: 100%;
    flex: 57 1 0;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  &__body-top-left {
    height: 100%;
    flex: 4;
    overflow: hidden;
    padding: 18px;
  }
  &__body-top-right {
    height: 100%;
    flex: 1;
    background-color: blue;
    overflow: hidden;
  }
  &__body-bottom {
    background-color: red;
    width: 100%;
    flex: 43 1 0;
    overflow: hidden;
  }
  &__footer {
    background-color: green;
    flex: 1;
    overflow: hidden;
  }
}
</style>
