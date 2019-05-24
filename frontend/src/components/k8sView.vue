<template>
  <div class="kubernetes-view">
    <!-- <div>
      <ol class="transit-view__train-list">
        <li v-for="item in k8s" :key="item" class="transit-view__train-listing">
          <span class="transit-view__train-name">{{item.name}}</span>
        </li>
      </ol>
      
    </div> -->
    <div class="transit-view">
        <!-- <h2 class="transit-view__station-name">K8s Deployments</h2> -->
        <main class="transit-view__station-line transit-view__station-line--red">
          <!-- <h4 class="transit-view__line-name transit-view__line-name--red">Red Line</h4> -->
          <section class="transit-view__line-direction">
            <ol class="transit-view__train-list">
              <li v-for="item in getDeployments" :key="item" class="transit-view__k8s-listing">
                <div class="transit-view__deployment-listing">
                  <div class="transit-view__train-listing">
                    <!-- <label>App Name: </label> -->
                    <span class="transit-view__deployment-name">{{item.name}}</span>
                  </div>
                  <div class="transit-view__deployment-context">
                    <!-- <label>🐋: </label> -->
                    <code class="transit-view__image-name">{{item.tag}}</code>
                    <code class="transit-view__sha">{{item.commit}}</code>
                  </div>
                  <!-- <div class="transit-view__train-listing">
                    <span class="transit-view__image-name">43110bc</span>
                  </div> -->
                </div>
              </li>
            </ol>
          </section>
        </main>
    </div>
    <button v-on:click="fetchCommits()"> Fetch Git Commits </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed: {
    ...mapState(['k8s']),
    getDeployments(){
      return this.k8s.deployments.map((deploy) => {
        console.log(deploy)
        var splitImage = deploy.image.split(':');
        return {
          ...deploy,
          imageName: splitImage[1],
        };
      })
    }
  },
  async mounted() {
    this.fetchK8s();
  },
  methods: {
    ...mapActions(['fetchK8s', 'fetchCommits']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@at-root {
  .kubernetes-view {
    height: 100%;
    overflow: hidden;
  }
  .transit-view {
    display: flex;
    flex-direction: row;
    // border: 1px solid #fbad35;
    // background-color: $midnight-express;
    background-color: $midnight-express;

    justify-content: stretch;
    &__rideshare-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0.5rem 0.25rem 0.5rem 0.5rem;
    }
    &__rideshare-service {
      @extend .material-box-shadow--level-2;
      background-color: $solitude;
      padding: 0.5rem;
      margin: 0.5rem;
      flex: 1;
      border-radius: 0.75rem;
      display: flex;
      flex-direction: column;
    }
    &__metro-section {
      flex: 1;
      display: flex;
      flex-direction: row;
      padding: 0.5rem 0.5rem 0.5rem 0.25rem;
      flex: 1.618 * 3;
    }
    &__k8s-section {
      flex: 1;
      display: flex;
      flex-direction: row;
      max-width: 320px;
      padding: 0.5rem 0.5rem 0.5rem 0.25rem;
      flex: 1.618 * 3;
    }
    &__metro-station {
      // @extend .material-box-shadow--level-2;
      // background-color: $solitude;
      padding: 0.5rem;
      margin: 0.5rem;
      // border-radius: 0.75rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      color: $solitude;
    }
    &__station-name {
      color: $lightest-gray;
      font-weight: 100;
      margin-bottom: 1rem;
    }
    &__station-alert {
      background-color: $solitude;
      padding: 1rem;
      border-radius: 0.5rem;
      color: $darkest-gray;
      margin-top: 0.5rem;
    }
    &__station-line {
      color: $solitude;
      // background-color: $solitude;
      padding: 0.6rem 0 1rem;
      border-radius: 0.5rem;
      color: $solitude;
      margin-top: 0.5rem;
      position: relative;
      display: inline;
    }
    &__train-list {
      margin-bottom: 1rem;
      // TODO: need to calculate this value with a function
      animation: moveDownUp linear 138s;
      animation-iteration-count:infinite;
      margin-top: 0.5rem;
      // background-color: $darkest-gray;
      padding: 0.6rem 0.6rem 0;
      border-radius: 0.3rem;
      position: relative;
      // overflow: hidden;
    }
    &__k8s-listing {
      margin-bottom: 1rem;
      // display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: $darkest-gray;
      padding: 0.25rem 0.6rem 0.25rem;
      overflow: hidden;
      position: relative;
      border-radius: 0.3rem;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(to bottom right, rgba(228, 231, 235, .20), rgba(92, 92, 95, .20));
      }
    }
    &__train-name {
      font-size: 1.5rem;
      // font-family: $font-monospace;
    }
    &__deployment-name {
      // color: $regal-blue;
      font-size: 1.5rem;
      font-weight:900;
      // font-family: $font-monospace;
    }
    &__deployment-context {
      display: flex;
      flex-direction: row;
      align-items: space-between;
      margin-top: 0.5rem;
    }
    &__deployment-listing {
      margin-bottom: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__image-name {
      font-size: 1.5rem;
      flex: 1;
      // font-family: $font-monospace;
      &:before {
        content: '🐳';
        margin-right: 0.4rem;
      }
    }
    &__train-time {
      font-size: 1.5rem;
      padding: 0.1em 0.3em;
      border-radius: 0.1em;
      border: 1px solid transparent;
      align-self: flex-end;
      &--arriving {
        background-color: #CF9901;
        border: 1px solid $link-water;
      }
    }
  }
}

</style>
