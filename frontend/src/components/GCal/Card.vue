<template>
    <div class="card">
      <article class="card__content">
        <h5 class="card__title">{{card.name}}</h5>
        <div class="card__body">
          <h6>Until {{card.end}}</h6>
          <br>
          <p>{{card.summary}}</p>
        </div>
      </article>
    </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    card: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
body {
  background-color:#E9E9E9;
  padding:1rem;
}

.grid {
  display:grid;
  width:100%;
  padding:0;
  list-style-type:none;
  grid-template-columns:repeat(auto-fill, minmax(150px, 1fr));
  grid-gap:1rem;
}

@media screen and (min-width: 768px){
  .grid__item:first-child{
    grid-column: span 2;
  }
}

.card {
  background-color: white;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition:transform .1s ease-in;
  display:flex;
  flex-direction:column;
  margin: 0 10px;
  height: 11.5rem;
  width:18.75rem;
  &__content {
    padding:1rem;
    display:flex;
    flex-direction:column;
    flex:1;
  }
  &__title {
    margin-left: 1rem;
  }
  &__body {
    flex:1;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
  &__footer {
    text-transform:uppercase;
    font-size:.75rem;
    color:#666;
    font-weight:600;
  }

}
</style>
