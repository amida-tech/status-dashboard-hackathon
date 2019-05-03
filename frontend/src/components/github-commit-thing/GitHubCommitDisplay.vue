<template>
  <div>
    <br>
    <div>GitHubCommitDisplay Test</div>
    <div>{{ hmm }}</div>
    <br>
    <br>
    <div class="github-feed">
      <div class="github-feed__feed-header">Most Recently Updated Repositories:</div>
      <div class="github-feed__feed-items" id="feedData">
        <div class="github-feed__feed-items-project">PROJECT 1</div>
        <div class="github-feed__feed-items-project">PROJECT 2</div>
        <div class="github-feed__feed-items-project">PROJECT 3</div>
          <div
          v-for="project in feedData"
          v-bind:key="project"
          class="github-feed__feed-items-project"
          >
            {{project.name}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

const feedData = new Vue({
  el: '#feedData',
  data: {
    feedData: [
      { project: 'This is a test' },
      { project: 'This is a second test' },
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
