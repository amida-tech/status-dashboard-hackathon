<script src="https://unpkg.com/vue-router"></script>
<template>
  <div>
    <br/>
    <a
        href="https://github.com/login/oauth/authorize?scope=user:email&client_id=7c13275faf3a6b218241"
        v-if="githubAuthCode.length < 0"
    >
        Please log into GitHub!
    </a>
    <div v-else>{{ githubFeedData }}</div>
    <br/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(
      new RegExp("^(?:.*[&\\?]"
        + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&")
        + "(?:\\=([^&]*))?)?.*$", "i"), "$1")
      );
}
const code = getQueryStringValue('code');

export default {
  name: 'GitHubCommitDisplay',
  props: {
    msg: String,
  },
  computed: {
    ...mapState([
        'githubAuthCode',
        'githubFeedData',
    ]),
  },
  async mounted() {
    this.setGitHubAuthCodeToState(code);
  },
  methods: {
    ...mapActions([
        'setGitHubAuthCodeToState',
    ]),
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
