<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="header-1">test</div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <SemanticElements msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
// import SemanticElements from './components/examples/SemanticElements.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    // SemanticElements,
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
