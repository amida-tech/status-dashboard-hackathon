<template>
  <div class="transit-view">
    <aside class="transit-view__rideshare-section">
      <section class="transit-view__rideshare-service">
        <h2>Uber</h2>
        <label>Estiamted arrival time</label>
        <span>4minutes</span>
        <label>surge multiplier</label>
        <span>1.2x</span>
      </section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
    </aside>
    <main class="transit-view__metro-section">
      <!-- 
        DUPONT CIR
       -->
      <section class="transit-view__metro-station">
        <h2 class="transit-view__station-name">Dupont Circle</h2>
        <ul class="transit-view__station-alerts">
          <label>Service Alerts</label>
          <li class="transit-view__station-alert">Due to fire dept activity at Mississippi Ave & 21st St SE, buses may experience delays in both directions.</li>
        </ul>
        <section class="transit-view__station-line transit-view__station-line--red">
          <h4>Red Line</h4>
          <section class="transit-view__line-direction">
            <h5>Shady Grove</h5>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in dupontShadyGroveTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">{{ train.DestinationName }} ({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' }">{{ train.Min === 'ARR' ? 'Arriving' : `${train.Min} minutes` }}</span>
              </li>
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
      <!-- 
        FARRAGUT NORTH
       -->
      <section class="transit-view__metro-station">
        <h2 class="transit-view__station-name">Farragut North</h2>
        <ul class="transit-view__station-alerts">
          <label>Service Alerts</label>
          <li class="transit-view__station-alert">Due to fire dept activity at Mississippi Ave & 21st St SE, buses may experience delays in both directions.</li>
        </ul>
        <section class="transit-view__station-line transit-view__station-line--red">
          <h4>Red Line</h4>
          <section class="transit-view__line-direction">
            <h5>Shady Grove</h5>
            <ol class="transit-view__train-list">
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time transit-view__train-time--arriving">Arriving</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
            </ol>
          </section>
          <section class="transit-view__line-direction">
            <h5>Glenmont</h5>
            <ol class="transit-view__train-list">
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time transit-view__train-time--arriving">Arriving</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
            </ol>
          </section>
        </section>
      </section>
      <!-- 
        FARRAGUT WEST
       -->
      <section class="transit-view__metro-station">
        <h2 class="transit-view__station-name">Farragut West</h2>
        <ul class="transit-view__station-alerts">
          <label>Service Alerts</label>
          <li class="transit-view__station-alert">Due to fire dept activity at Mississippi Ave & 21st St SE, buses may experience delays in both directions.</li>
        </ul>
        <section class="transit-view__station-line transit-view__station-line--orange">
          <h4>Orange Line</h4>
          <section class="transit-view__line-direction">
            <h5>Shady Grove</h5>
            <ol class="transit-view__train-list">
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time transit-view__train-time--arriving">Arriving</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
            </ol>
          </section>
          <section class="transit-view__line-direction">
            <h5>Glenmont</h5>
            <ol class="transit-view__train-list">
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time transit-view__train-time--arriving">Arriving</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
            </ol>
          </section>
        </section>
        <section class="transit-view__station-line transit-view__station-line--blue">
          <h4>Blue Line</h4>
          <section class="transit-view__line-direction">
            <h5>Shady Grove</h5>
            <ol class="transit-view__train-list">
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time transit-view__train-time--arriving">Arriving</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
            </ol>
          </section>
          <section class="transit-view__line-direction">
            <h5>Glenmont</h5>
            <ol class="transit-view__train-list">
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time transit-view__train-time--arriving">Arriving</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
            </ol>
          </section>
        </section>
        <section class="transit-view__station-line transit-view__station-line--silver">
          <h4>Silver Line</h4>
          <section class="transit-view__line-direction">
            <h5>Shady Grove</h5>
            <ol class="transit-view__train-list">
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time transit-view__train-time--arriving">Arriving</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
            </ol>
          </section>
          <section class="transit-view__line-direction">
            <h5>Glenmont</h5>
            <ol class="transit-view__train-list">
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time transit-view__train-time--arriving">Arriving</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
              <li class="transit-view__train-listing">
                <span class="transit-view__train-name">Shady Grove (6 Cars)</span>
                <span class="transit-view__train-time">3 minutes</span>
              </li>
            </ol>
          </section>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TransitView',
  computed: {
    ...mapState(['wmata']),
    dupontShadyGroveTrains() {
      return this.wmata.A02.filter(train => train.DestinationName === 'Shady Grove');
    },
    dupontGlenmontTrains() {
      return this.wmata.A02.filter(train => train.DestinationName === 'Glenmont');
    },
  },
  async mounted() {
    this.fetchAll()
    setInterval(this.fetchAll, 30000);
  },
  methods: {
    ...mapActions(['fetchTrainsByStation']),
    fetchAll() {
      this.fetchTrainsByStation('A03');
      this.fetchTrainsByStation('A02');
      this.fetchTrainsByStation('C03');
    }
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
      background-color: $solitude;
      padding: 0.6rem 1rem 1rem;
      border-radius: 0.5rem;
      color: $solitude;
      margin-top: 1rem;
      &--red {
        background-color: #E44446;
      }
      &--orange {
        background-color: #F89732;
      }
      &--blue {
        background-color: #007CC1;
      }
      &--green {
        background-color: #50AD59;
      }
      &--yellow {
        background-color: #FFD338;
      }
      &--silver {
        background-color: #A4A6A3;
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
