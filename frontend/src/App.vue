<template>
  <div class="app">
    <Layout/>
    <Card/>
  </div>
</template>

<script>
import Layout from './components/GCal/Layout.vue';
import Card from './components/GCal/Card.vue';

export default {
  name: 'app',
  components: {
    Layout,
    Card,
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
