<template>
  <div class="cards-container">
      <Card
        class="scroll-right card--animated"
        v-if="data.length > 4"
        v-for="(card, index) in data"
        :key="index"
        :card="card"
      />
      <Card
        v-if="data.length <= 4"
        v-for="(card, index) in data"
        :key="index"
        :card="card"
      />
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'Row',
  components: {
    Card,
  },
  props: {
    data: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .cards-container {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .scroll-right {
    overflow: hidden;
    position: relative;
  }
   .card {
     &--animated{
      text-align: center;
      /* Starting position */
      -moz-transform:translateX(100%);
      -webkit-transform:translateX(100%);
      transform:translateX(100%);
      /* Apply animation to this element */
      -moz-animation: scroll-left 10s linear infinite;
      -webkit-animation: scroll-left 10s linear infinite;
      animation: scroll-left 10s linear infinite;
      }
      /* Move it (define the animation) */
      @-moz-keyframes scroll-left {
        0% { -moz-transform: translateX(100%); }
        100% { -moz-transform: translateX(-100%); }
      }
      @-webkit-keyframes scroll-left {
        0% { -webkit-transform: translateX(100%); }
        100% { -webkit-transform: translateX(-100%); }
      }
      @keyframes scroll-left {
        0% {
          -moz-transform: translateX(-100%); /* Browser bug fix */
          -webkit-transform: translateX(-100%); /* Browser bug fix */
          transform: translateX(-100%);
        }
        100% {
          -moz-transform: translateX(100%); /* Browser bug fix */
          -webkit-transform: translateX(100%); /* Browser bug fix */
          transform: translateX(100%);
        }
      }

    }


</style>
