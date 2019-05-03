<template>
  <div>
    <br/>
    <div>GitHubCommitDisplay</div>
    <div>{{ hmm }}</div>
    <br/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'GitHubCommitDisplay',
  props: {
    msg: String,
  },
  computed: {
    ...mapState(['wmata']),
  },
  async mounted() {
    // this.fetchWmata();
    // TODO: GitHub launch fetch
  },
  methods: {
    ...mapActions(['fetchWmata']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
