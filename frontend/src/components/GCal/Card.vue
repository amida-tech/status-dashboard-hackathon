<template>
  <div class="Card">
    <ul class="grid">
  <li class="grid__item">
 
    <a href="#" class="card">
      <div class="card__image">
      </div>
      <article class="card__content">
        <h2 class="card__title">Riley</h2>
        <div class="card__body">
          <h5>All Day</h5>
          <br>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </article>
    </a>
  </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {},
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
  max-width:1000px;
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
  min-height:100%;
  
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
