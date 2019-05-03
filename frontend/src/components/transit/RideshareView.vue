<template>
  <div class="rideshare-view">
    <aside class="rideshare-view__rideshare-section">
      <section class="rideshare-view__rideshare-service">
        <h2>Uber</h2>
        <label>Estiamted arrival time</label>
        <span>4min</span>
        <label>surge multiplier</label>
        <span>1.2x</span>
      </section>
      <section class="rideshare-view__rideshare-service">
        <h2>Uber</h2>
        <label>Estiamted arrival time</label>
        <span>4min</span>
        <label>surge multiplier</label>
        <span>1.2x</span>
      </section>
    </aside>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'RideshareView',
  computed: {
    ...mapState(['wmata']),
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
  .rideshare-view {
    display: flex;
    flex-direction: column;
    border: 1px solid #fbad35;
    background-color: $midnight-express;
    justify-content: stretch;
    &__rideshare-section {
      flex: 1;
      display: flex;
      flex-direction: column;
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
      .rideshare-view__station-line {
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
