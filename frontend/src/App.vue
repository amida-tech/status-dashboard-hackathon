<template>
  <div class="app">
    <section class="app_header">

    </section>
    <section class="app__body">
      <section class="app__body-sidebar">
        KUBERNETES COMPONENT HERE
      </section>
      <section class="app__body-main">
        <section class="app__body-top">
          <section class="app__body-top-left">
          WFH COMPONENT HERE
          </section>
          <section class="app__body-top-right">
          RIDESHARE COMPONENT HERE
          </section>
        </section>
        <section class="app__body-bottom">
        METRO COMPONENT HERE
        </section>
      </section>
    </section>
    <section class="app__footer">
      TICKER COMPONENT HERE
    </section>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import SemanticElements from './components/examples/SemanticElements.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    SemanticElements,
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
    overflow: hidden
  }
  &__body {
    flex: 15;
    display: flex;
    flex-direction: row;
    overflow: hidden
  }
  &__body-sidebar {
    background-color: purple;
    height: 100%;
    flex: 1;
    overflow: hidden
  }
  &__body-main {
    height: 100%;
    flex: 5;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  &__body-top {
    background-color: orange;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  &__body-top-left {
    height: 100%;
    flex: 4;
    overflow: hidden;
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
    flex: 1;
    overflow: hidden;
  }
  &__footer {
    background-color: green;
    flex: 1;
    overflow: hidden;
  }
}
</style>
