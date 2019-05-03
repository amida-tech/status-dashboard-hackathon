<template>
  <div class="app">
    <Layout/>
  </div>
</template>

<script>
import Layout from './components/GCal/Layout.vue';

export default {
  name: 'app',
  components: {
    Layout,
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
