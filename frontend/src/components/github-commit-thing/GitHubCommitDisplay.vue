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
import config from '../../config';

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

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

if(code.length > 0) {
    // TODO: Make request for access_token
    const options = {
        method: 'POST',
        queryParams: {
            client_id: config.ghClientId,//process.env.GH_CLIENT_ID, // not working
            client_secret: config.ghClientSecret,//process.env.GH_CLIENT_SECRET, // not working
            code: code,
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };

    console.log('>>>>> GitHubCommitDisplay > options[1]: ', options);

    let url = 'https://github.com/login/oauth/access_token';

    if(options.queryParams) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
        // delete options.queryParams;
    }

    // NOTE: Because... https://stackoverflow.com/a/42150336
    // NOTE: This potentially exposes the credentials to this service...
    // --- consider using https://github.com/prose/gatekeeper instead
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';

    console.log('>>>>> GitHubCommitDisplay > options[2]: ', options);
    console.log('>>>>> GitHubCommitDisplay > url: ', url);

    fetch(
        proxyurl + url, // https://cors-anywhere.herokuapp.com/https://example.com
        // 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
        options,
    )
    .then((response) => {
        console.log('>>>>> GitHubCommitDisplay > fetch oauth/access_token > response: ', response);
    })
    .catch((error) => {
        console.log('>>>>> GitHubCommitDisplay > fetch oauth/access_token > error: ', error);
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
