<template>
  <div>
    <br>
    <div>GitHubCommitDisplay</div>
    <div>{{ hmm }}</div>
    <br>
    <br>
    <div class="github-feed">
        <div class="github-feed__feed-header">
          Most Recently Updated Repositories:
        </div>
        <div class="github-feed__feed-items">
          <div class="github-feed__feed-items-project">PROJECT 1 </div>
          <div class="github-feed__feed-items-project">PROJECT 2 </div>
          <div class="github-feed__feed-items-project">PROJECT 3 </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "GitHubCommitDisplay",
  props: {
    msg: String
  },
  computed: {
    ...mapState(["wmata"])
  },
  async mounted() {
    // this.fetchWmata();
    // TODO: GitHub launch fetch
  },
  methods: {
    ...mapActions(["fetchWmata"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
// @import "..\styles\core.scss"
</style>
