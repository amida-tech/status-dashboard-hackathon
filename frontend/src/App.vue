<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="header-1">test</div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <GitHubCommitDisplay msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import GitHubCommitDisplay from './components/github-commit-thing/GitHubCommitDisplay.vue';
import HelloWorld from './components/HelloWorld.vue';


export default {
  name: 'app',
  components: {
    GitHubCommitDisplay,
    HelloWorld,
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
