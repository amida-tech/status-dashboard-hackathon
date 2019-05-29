<script src="https://unpkg.com/vue-router"></script>
<template>
  <div>
    <br>
    <div class="github-feed">
      <a
        href="https://github.com/login/oauth/authorize?scope=user:email&client_id=7c13275faf3a6b218241"
        v-if="!githubAuthCode || githubAuthCode.length > 0"
      >
        Please log into GitHub!
      </a>
      <div v-else class= "github-feed__feed-background">
        <div class="github-feed__feed-header">Most Recently Updated Repositories:</div>
        <div class="github-feed__feed-items" id="feedData-feeder">
          <div
            v-for="project of feedData"
            v-bind:key="project"
            class="github-feed__feed-items-project"
          >
            {{project.commit}}
          </div>
        </div>
      </div>
    </div>
    <br/>
    <br/>
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
  githubLoginUrl: `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.GH_CLIENT_ID}`,
});

function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(
      new RegExp("^(?:.*[&\\?]"
        + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&")
        + "(?:\\=([^&]*))?)?.*$", "i"), "$1")
      );
}
const code = getQueryStringValue('code');

if(code.length > 0) {
    // TODO: Make request for access_token
    const options = {
        client_id: process.env.GH_CLIENT_ID, // not working
        client_secret: process.env.GH_CLIENT_SECRET, // not working
        code: code,
        headers: {
            "Accept": "application/json",
        },
    };
    console.log('>>>>> options: ', options);

    fetch(
        'https://github.com/login/oauth/access_token',
        options
    )
    .then((response) => {
        console.log('GitHubCommitDisplay > response: ', respone);
    });
}

export default {
  name: 'GitHubCommitDisplay',
  data() {
    return {
      feedData: [
        { commit: 'This is a test' },
        { commit: 'This is a second test' },
        { commit: 'This is a third test' },
      ],
    };
  },
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
// @import "..\styles\core.scss"
</style>
