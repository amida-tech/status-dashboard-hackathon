<template>
  <div class="cards-container">
    <Card  v-for="(card, index) in data" :key="index" :card="card">
  </div>
</template>

<script>
import Card from './Card';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Row',
  components: {
    Card
  },
  props: { 
    data: Array
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .cards-container {
    height: 100%;
    width: 100%;
  }
</style>
