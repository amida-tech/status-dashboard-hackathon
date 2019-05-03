<template>
  <div class="app">
    <!-- <SemanticElements msg="Welcome to Your Vue.js App"/> -->
    <TransitView />
    <SemanticElements/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import SemanticElements from './components/examples/SemanticElements.vue';
import TransitView from './components/transit/TransitView.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld,
    SemanticElements,
    TransitView,
  },
};
</script>

<style lang="scss">
// .app {
//   @extend .layout-main-container;
// }
// #app {
//   font-family: 'Source Sans Pro', sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
