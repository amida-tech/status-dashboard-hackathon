<template>
  <div class="room-card">
      <section class="room-card__rideshare-service">
        <div class="room-card__rideshare-service-header room-card__rideshare-service-header--available">
          <label>Big Table</label>
        </div>
        <span class="room-card__rideshare-service-content--indent room-card__rideshare-service-value">{{getBigTable.busy}}</span>
        <!-- <span class="room-card__rideshare-service-content--indent room-card__rideshare-service-value"><a>{{getBigTable}}</a></span> -->
        <label class="room-card__rideshare-service-content--indent room-card__rideshare-service-label">{{getBigTable.next_event.conference.location}}</label>
        <span class="room-card__rideshare-service-content--indent room-card__rideshare-service-value">{{getBigTable.next_event.summary}}</span>
      </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'MeetingsView',
  computed: {
    ...mapState(['meetings']),
    getBigTable() {
      return this.meetings.table
    },
    getSmallConferenceRoom() {
      return this.meetings.small
    },
    getBigConferenceRoom() {
      return this.meetings.big
    }
  },
  async mounted() {
    this.fetchMeetings()
    setInterval(this.fetchMeetings, 30000);
  },
  methods: {
    ...mapActions(['fetchMeetings']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@at-root {
  .room-card {
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
      &--available {
        color: #FFFFFF;
        background-color: #2ECC40;
      }
      &--busy {
        color: #FFFFFF;
        background-color: #FF4136;
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
