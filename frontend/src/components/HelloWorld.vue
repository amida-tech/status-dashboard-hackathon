<template>
  <div class="hello-world">
    <!-- <div>
      <ol class="transit-view__train-list">
        <li v-for="item in k8s" :key="item" class="transit-view__train-listing">
          <span class="transit-view__train-name">{{item.name}}</span>
        </li>
      </ol>
      
    </div> -->
    <div class="transit-view">
    <main class="transit-view__metro-section">
      <section class="transit-view__metro-station">
        <h2 class="transit-view__station-name">Kubernetes Deployments</h2>
        <!-- <ul class="transit-view__station-alerts">
          <label>Service Alerts</label>
          <li class="transit-view__station-alert">Due to fire dept activity at Mississippi Ave & 21st St SE, buses may experience delays in both directions.</li>
        </ul> -->
        <section class="transit-view__station-line transit-view__station-line--red">
          <h4 class="transit-view__line-name transit-view__line-name--red">Red Line</h4>
          <section class="transit-view__line-direction">
            <h5>Shady Grove</h5>
            <ol class="transit-view__train-list">
              <li v-for="item in k8s" :key="item" class="transit-view__train-listing">
                <span class="transit-view__train-name">{{item.name}}</span>
              </li>
              <!-- <li v-for="(deployment, index) in k8s" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">{{ deployment.name }}</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' }">{{ train.Min === 'ARR' ? 'Arriving' : `${train.Min} minutes` }}</span>
              </li> -->
            </ol>
          </section>
          <section class="transit-view__line-direction">
            <h5>Glenmont</h5>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in dupontGlenmontTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">{{ train.DestinationName }} ({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' }">{{ train.Min === 'ARR' ? 'Arriving' : `${train.Min} minutes` }}</span>
              </li>
            </ol>
          </section>
        </section>
      </section>
    </main>
    </div>
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
  },
  async mounted() {
    this.fetchK8s();
  },
  methods: {
    ...mapActions(['fetchK8s']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@at-root {
  .transit-view {
    display: flex;
    flex-direction: row;
    border: 1px solid #fbad35;
    background-color: $midnight-express;
    height: 1080px;
    width: 1920px;
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
    &__line-name {
      color: $lightest-gray;
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      &--red {
        &:before {
          @extend span;
          color: $lightest-gray;
          height: 2em;
          display: inline-block;
          width: 2em;
          line-height: 1.9em;
          font-weight: 700;
          border-radius: 1em;
          text-align: center;
          content: 'RD';
          background-color: #E44446;
          margin-right: 0.5rem;
        }
      }
      &--orange {
        &:before {
          @extend span;
          color: $darkest-gray;
          height: 2em;
          display: inline-block;
          width: 2em;
          line-height: 1.9em;
          font-weight: 700;
          border-radius: 1em;
          text-align: center;
          content: 'OR';
          background-color: #F89732;
          margin-right: 0.5rem;
        }
        // background-color: #F89732;
      }
      &--blue {
        &:before {
          @extend span;
          color: $lightest-gray;
          height: 2em;
          display: inline-block;
          width: 2em;
          line-height: 1.9em;
          font-weight: 700;
          border-radius: 1em;
          text-align: center;
          content: 'BL';
          background-color: #007CC1;
          margin-right: 0.5rem;
        }
      }
      &--green {
        &:before {
          @extend span;
          color: $lightest-gray;
          height: 2em;
          display: inline-block;
          width: 2em;
          line-height: 1.9em;
          font-weight: 700;
          border-radius: 1em;
          text-align: center;
          content: 'GR';
          background-color: #50AD59;
          margin-right: 0.5rem;
        }
      }
      &--yellow {
        &:before {
          @extend span;
          color: $darkest-gray;
          height: 2em;
          display: inline-block;
          width: 2em;
          line-height: 1.9em;
          font-weight: 700;
          border-radius: 1em;
          text-align: center;
          content: 'YL';
          background-color: #FFD338;
          margin-right: 0.5rem;
        }
      }
      &--silver {
        &:before {
          @extend span;
          color: $darkest-gray;
          height: 2em;
          display: inline-block;
          width: 2em;
          line-height: 1.9em;
          font-weight: 700;
          border-radius: 1em;
          text-align: center;
          content: 'SV';
          background-color: #A4A6A3;
          margin-right: 0.5rem;
        }
      }
      
    }
    &__train-list {
      margin-bottom: 1rem;
      margin-top: 0.5rem;
      background-color: $darkest-gray;
      padding: 0.6rem 0.6rem 0;
      border-radius: 0.3rem;
      position: relative;
      overflow: hidden;
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
    &__train-listing {
      margin-bottom: 0.5rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &__train-name {
      font-size: 1.5rem;
      // font-family: $font-monospace;
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
