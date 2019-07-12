<template>
  <div class="rideshare-view">
    <aside class="rideshare-view__rideshare-section">
      <section class="rideshare-view__rideshare-service">
        <div class="rideshare-view__rideshare-service-header rideshare-view__rideshare-service-header--uber">
          <label>Clock</label>
        </div>
        <div class="rideshare-view__clock-container">
          <span class="time">{{time}}</span>
          <span class="time">{{date}}</span>
        </div>
      </section>
    </aside>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
var moment = require('moment')

// const getMinutes = () => {moment().minutes()}
// const getHour = () => {moment().hours()}
// const getSeconds = () => {moment().seconds()}


export default {
  name: 'ClockView',
  data() {
    return {
      // ticker: null,
      // minutes: moment().minutes(),
      // hours: moment().hours(),
      // seconds: moment().seconds(),
      time: moment().format('LTS'),
      date: moment().format("MMM Do YYYY")
    };
  },
  computed: {
    // getTime(){
    //   var time = moment().format()
    //   setInterval(() => {
    //     time = moment().format()
    //     console.log('Jonah', time)
    //   }, 1000)
    //   return time
    // }
  },
  created() {
    this.ticker = setInterval(() => {
      // this.minutes = moment().minutes();
      // this.hours = moment().hours();
      // this.seconds = moment().seconds();
      this.date = moment().format("MMM Do YYYY")
      this.time =  moment().format('LTS')
    }, 1000);
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@at-root {
  .rideshare-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: $midnight-express;
    justify-content: stretch;
    &__rideshare-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding: 0.5rem;
      padding-bottom: 0;
    }
    &__clock-container{
      display: flex;
      flex-direction: column;
    }
    &__rideshare-service {
      @extend .material-box-shadow--level-2;
      background-color: $solitude;
      margin: 0.5rem;
      border-radius: 0.9rem;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
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
    &__rideshare-service-header {
      background-color: $solitude;
      padding: 0.5rem 1rem;
      display: block;
      font-size: 1.5rem;
      &--uber {
        color: #FFFFFF;
        background-color: #276EF1;
      }
      &--lyft {
        color: #FFFFFF;
        background-color: #ff00bf;
      }
    }
    &__rideshare-service-content--indent {
      margin: 0 0.5rem;
    }
    &__rideshare-service-value {
      line-height: 1.2;
    }
    label:nth-child(2) {
      margin-top: 0.8rem;
    }
    label:not(:nth-child(2)) {
      margin-top: 1.2rem;
    }
    span:last-child {
      margin-bottom: 0.8rem;
    }

  }
}
</style>
