<template>
  <div>
    <br>
    <div>GitHubCommitDisplay Test</div>
    <div>{{ hmm }}</div>
    <br>
    <br>
    <div class="github-feed">
      <div class="github-feed__feed-header">Most Recently Updated Repositories:</div>
      <div class="github-feed__feed-items" id="feedData-feeder">
        <div class="github-feed__feed-items-project">PROJECT 1</div>
        <div class="github-feed__feed-items-project">PROJECT 2</div>
        <div class="github-feed__feed-items-project">PROJECT 3</div>
        <div
          v-for="project of feedData"
          v-bind:key="project"
          class="github-feed__feed-items-project"
        >
          {{project}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Vue from 'vue';

const feedData = new Vue({
  el: '#feedData-feeder',
  data: {
    feedData: [
      { commit: 'This is a test' },
      { commit: 'This is a second test' },
      { commit: 'This is a third test' },
    ],
  },
});

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
// @import "..\styles\core.scss"
</style>
