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
          <div class="github-feed__feed-items-project"><a href='#' target = '_blank'>PROJECT 1</a></div>
          <div class="github-feed__feed-items-project"><a href='#2' target = '_blank'>PROJECT 2</a></div>
          <div class="github-feed__feed-items-project"><a href='#3' target = '_blank'>PROJECT 3</a></div>
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
