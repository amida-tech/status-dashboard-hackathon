<template>
  <div class="transit-view">
    <aside class="transit-view__rideshare-section">
      <section class="transit-view__rideshare-service">
        <h2>UberX</h2>
        <label>Estimated arrival time</label>
        <span>{{ transitInfo.uber_times && transitInfo.uber_times.UberX }}</span>
        <!-- <h2>UberXL</h2>
        <label>Estimated arrival time</label>
        <span>{{ transitInfo.uber_times && transitInfo.uber_times.UberXL }}</span>
        <h2>Uber Black</h2>
        <label>Estimated arrival time</label>
        <span>{{ transitInfo.uber_times && transitInfo.uber_times.Black }}</span>
        <h2>Uber Pool</h2>
        <label>Estimated arrival time</label>
        <span>{{ transitInfo.uber_times && transitInfo.uber_times.Pool }}</span> -->
        <label>surge multiplier</label>
        <span>{{ transitInfo.uber_times && transitInfo.uber_times.Surge }}</span>
      </section>
      <section class="transit-view__rideshare-service">
        <h2>Weather</h2>
        <label>Summary</label>
        <span>{{ transitInfo.weather && transitInfo.weather.summary }}</span>
        <label>Temperature</label>
        <span>{{ transitInfo.weather && transitInfo.weather.temperature }} ℉</span>
        <label>Precipitation</label>
        <span>{{ transitInfo.weather && transitInfo.weather.precipitation }}</span>

      </section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
      <section class="transit-view__rideshare-service"></section>
    </aside>
    <main class="transit-view__metro-section">
      <!--
        DUPONT CIR
       -->
      <section class="transit-view__metro-station">
        <h3 class="transit-view__station-name">Dupont Circle</h3>
        <!-- <ul class="transit-view__station-alerts">
          <label>Service Alerts</label>
          <li class="transit-view__station-alert">Due to fire dept activity at Mississippi Ave & 21st St SE, buses may experience delays in both directions.</li>
        </ul> -->
        <section class="transit-view__station-line transit-view__station-line--red">
          <h5 class="transit-view__line-name transit-view__line-name--red">Red Line</h5>
          <section class="transit-view__line-direction">
            <h6 class="transit-view__line-direction-name">Shady Grove</h6>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in dupontShadyGroveTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' || train.Min === 'BRD' }">{{ train.Min === 'BRD' ? 'Boarding' : train.Min === 'ARR' ? 'Arriving' : `${train.Min} min` }}</span>
              </li>
            </ol>
          </section>
          <section class="transit-view__line-direction">
            <h6 class="transit-view__line-direction-name">Glenmont</h6>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in dupontGlenmontTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' || train.Min === 'BRD' }">{{ train.Min === 'BRD' ? 'Boarding' : train.Min === 'ARR' ? 'Arriving' : `${train.Min} min` }}</span>
              </li>
            </ol>
          </section>
        </section>
      </section>
      <!--
        FARRAGUT NORTH
       -->
      <section class="transit-view__metro-station">
        <h3 class="transit-view__station-name">Farragut North</h3>
        <!-- <ul class="transit-view__station-alerts">
          <label>Service Alerts</label>
          <li class="transit-view__station-alert">Due to fire dept activity at Mississippi Ave & 21st St SE, buses may experience delays in both directions.</li>
        </ul> -->
        <section class="transit-view__station-line transit-view__station-line--red">
          <h5 class="transit-view__line-name transit-view__line-name--red">Red Line</h5>
          <section class="transit-view__line-direction">
            <h6 class="transit-view__line-direction-name">Shady Grove</h6>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in farrNorthShadyGroveTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' || train.Min === 'BRD' }">{{ train.Min === 'BRD' ? 'Boarding' : train.Min === 'ARR' ? 'Arriving' : `${train.Min} min` }}</span>
              </li>
            </ol>
          </section>
          <section class="transit-view__line-direction">
            <h6 class="transit-view__line-direction-name">Glenmont</h6>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in farrNorthGlenmontTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' || train.Min === 'BRD' }">{{ train.Min === 'BRD' ? 'Boarding' : train.Min === 'ARR' ? 'Arriving' : `${train.Min} min` }}</span>
              </li>
            </ol>
          </section>
        </section>
      </section>
      <!--
        FARRAGUT WEST
       -->
      <section class="transit-view__metro-station transit-view__metro-station--large">
        <h3 class="transit-view__station-name">Farragut West</h3>
        <!-- <ul class="transit-view__station-alerts">
          <label>Service Alerts</label>
          <li class="transit-view__station-alert">Due to fire dept activity at Mississippi Ave & 21st St SE, buses may experience delays in both directions.</li>
        </ul> -->
        <div class="transit-view__station-body">
          <section class="transit-view__station-line transit-view__station-line--orange">
          <h5 class="transit-view__line-name transit-view__line-name--orange">Orange Line</h5>
          <section class="transit-view__line-direction">
            <h6 class="transit-view__line-direction-name">Vienna</h6>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in farrWestViennaTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' || train.Min === 'BRD' }">{{ train.Min === 'BRD' ? 'Boarding' : train.Min === 'ARR' ? 'Arriving' : `${train.Min} min` }}</span>
              </li>
            </ol>
          </section>
          <section class="transit-view__line-direction">
            <h6 class="transit-view__line-direction-name">New Carrolton</h6>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in farrWestNewCarrTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' || train.Min === 'BRD' }">{{ train.Min === 'BRD' ? 'Boarding' : train.Min === 'ARR' ? 'Arriving' : `${train.Min} min` }}</span>
              </li>
            </ol>
          </section>
        </section>
        <section class="transit-view__station-line transit-view__station-line--blue">
          <h5 class="transit-view__line-name transit-view__line-name--blue">Blue Line</h5>
          <section class="transit-view__line-direction">
            <h6 class="transit-view__line-direction-name">Franconia-Springfield</h6>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in farrWestFranTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' || train.Min === 'BRD' }">{{ train.Min === 'BRD' ? 'Boarding' : train.Min === 'ARR' ? 'Arriving' : `${train.Min} min` }}</span>
              </li>
            </ol>
          </section>
          <section class="transit-view__line-direction">
            <h6 class="transit-view__line-direction-name">Largo Town Center</h6>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in farrWestLargoBlueTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' || train.Min === 'BRD' }">{{ train.Min === 'BRD' ? 'Boarding' : train.Min === 'ARR' ? 'Arriving' : `${train.Min} min` }}</span>
              </li>
            </ol>
          </section>
        </section>
        <section class="transit-view__station-line transit-view__station-line--silver">
          <h5 class="transit-view__line-name transit-view__line-name--silver">Silver Line</h5>
          <section class="transit-view__line-direction">
            <h6 class="transit-view__line-direction-name">Wiehle-Reston East</h6>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in farrWestWiehleTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' || train.Min === 'BRD' }">{{ train.Min === 'BRD' ? 'Boarding' : train.Min === 'ARR' ? 'Arriving' : `${train.Min} min` }}</span>
              </li>
            </ol>
          </section>
          <section class="transit-view__line-direction">
            <h6 class="transit-view__line-direction-name">Largo Town Center</h6>
            <ol class="transit-view__train-list">
              <li v-for="(train, index) in farrWestLargoSilverTrains" :key="index" class="transit-view__train-listing">
                <span class="transit-view__train-name">({{ train.Car }} Cars)</span>
                <span class="transit-view__train-time" :class="{'transit-view__train-time--arriving': train.Min === 'ARR' || train.Min === 'BRD' }">{{ train.Min === 'BRD' ? 'Boarding' : train.Min === 'ARR' ? 'Arriving' : `${train.Min} min` }}</span>
              </li>
            </ol>
          </section>
        </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TransitView',
  computed: {
    ...mapState(['wmata', 'transitInfo']),
    dupontShadyGroveTrains() {
      return this.wmata.A03.filter(train => train.DestinationName === 'Shady Grove');
    },
    dupontGlenmontTrains() {
      return this.wmata.A03.filter(train => train.DestinationName === 'Glenmont');
    },
    farrNorthShadyGroveTrains() {
      return this.wmata.A02.filter(train => train.DestinationName === 'Shady Grove');
    },
    farrNorthGlenmontTrains() {
      return this.wmata.A02.filter(train => train.DestinationName === 'Glenmont');
    },
    farrWestViennaTrains() {
      return this.wmata.C03.filter(train => train.DestinationName === 'Vienna/Fairfax-GMU');
    },
    farrWestNewCarrTrains() {
      return this.wmata.C03.filter(train => train.DestinationName === 'New Carrollton');
    },
    farrWestLargoBlueTrains() {
      return this.wmata.C03.filter(train => train.DestinationName === 'Largo Town Center' && train.Line === 'BL');
    },
    farrWestFranTrains() {
      return this.wmata.C03.filter(train => train.DestinationName === 'Franconia-Springfield');
    },
    farrWestLargoSilverTrains() {
      return this.wmata.C03.filter(train => train.DestinationName === 'Largo Town Center' && train.Line === 'SV');
    },
    farrWestWiehleTrains() {
      return this.wmata.C03.filter(train => train.DestinationName === 'Wiehle-Reston East');
    },
  },
  async mounted() {
    this.fetchAll()
    setInterval(this.fetchAll, 30000);
  },
  methods: {
    ...mapActions(['fetchTrainsByStation', 'fetchTransitInfo']),
    fetchAll() {
      this.fetchTrainsByStation('A03');
      this.fetchTrainsByStation('A02');
      this.fetchTrainsByStation('C03');
      this.fetchTransitInfo();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@at-root {
  .transit-view {
    display: flex;
    flex-direction: column;
    border: 1px solid #fbad35;
    background-color: $midnight-express;
    height: 1080px;
    width: 1920px;
    justify-content: stretch;
    &__rideshare-section {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0.5rem;
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
      height: 50%;
      align-self: flex-end;
    }
    &__metro-section {
      flex: 1;
      display: flex;
      flex-direction: row;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    &__metro-station {
      // @extend .material-box-shadow--level-2;
      // background-color: $solitude;
      // padding: 0.5rem;
      padding: 0 1rem;
      // margin: 0 1rem;
      // margin: 0.5rem;
      // border-radius: 0.75rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      color: $solitude;
      &--large {
        flex: 3;
      }
    }
    &__station-name {
      color: $lightest-gray;
      font-weight: 100;
      // margin-bottom: 1rem;
    }
    &__station-body {
      display: flex;
      flex-direction: row;
      align-items: space-between;
      .transit-view__station-line {
        flex: 1;
        margin-right: 2rem;
        &:last-of-type {
          margin-right: 0.5rem;
        }
      }
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
      margin-left: -0.3rem;
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
    &__line-direction-name {
      color: $link-water;
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
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
    }
    &__train-name {
      font-size: 1.5rem;
      // font-family: $font-monospace;
    }
    &__train-time {
      font-size: 1.5rem;
      margin: 0.1em 0;
      padding: 0 0.3em;
      border-radius: 0.1em;
      border: 1px solid transparent;
      align-self: flex-end;
      &--arriving {
        background-color: $lightest-gray;
        color: $darkest-gray;
        font-weight: 700;
        border: 1px solid $link-water;
      }
    }
  }
}
</style>
