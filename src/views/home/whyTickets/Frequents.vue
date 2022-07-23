<template>
  <card>
    <h2 class="frequents-title">Rutas y Pasajes más frecuentes</h2>
    <div class="frequents">
      <ul>
        <li>De Ciudad de Buenos Aires A Asunción</li>
        <li>De Encarnación a Rio Cuatro</li>
        <li>De Asunción a Corrientes</li>
      </ul>
      <ul>
        <li>De Asunción a Rosario</li>
        <li>De Ciudad del este a Asunción</li>
        <li>De Asuncion a La Plata</li>
      </ul>
    </div>
    <a class="frequents-link">
      <i class="fa fa-arrow-right"></i>
      Más destinos
    </a>
  </card>
</template>
<script>
import Card from './components/Card'

export default {
  components: {
    Card
  },

  data: () => ({
    items: new Array(8).fill('/static/imgs/home/brand-').map((item, i) => item + (i + 1) + '.png')
  })
}
</script>
<style lang="stylus" scoped>
>>> div.home-card {
  background-color: #270071;
}
.frequents-title {
  color: #FF3B33;
  font-size: 2rem;
  text-align: center;
}
.frequents {
  display: grid;
  grid-template-columns: repeat(auto-fit, 410px);
  justify-content: center;
  column-gap: 8vw;
  ul {
    list-style: none;
    font-size: 1.5rem;
    color: white;
  }
  ul > li {
    margin: 50px 0;
  }
  ul:nth-child(1) > li:last-child {
    margin-bottom: 0;
  }
}
.frequents-link {
  display: block;
  color: #FF3B33;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  .fa {
    font-size: 1.8rem;
    margin-right: 1rem;
  }
}
</style>

