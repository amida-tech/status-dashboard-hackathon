<template>
  <div class="app">
    <GCal/>
  </div>
</template>

<script>
import GCal from './components/GCal/GCal.vue';

export default {
  name: 'app',
  components: {
    GCal,
  },
};
</script>

<style lang="scss">
.app {
  @extend .layout-main-container;
}
// #app {
//   font-family: 'Source Sans Pro', sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
