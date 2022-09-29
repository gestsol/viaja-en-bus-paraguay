<template>
  <card>
    <h2 class="media-title">En los medios</h2>
    <div class="media">
      <div v-for="(item, i) of items" :key="i" :class="'brand-' + (i + 1)">
        <img :src="item" :alt="'brand-' + (i + 1)" />
      </div>
    </div>
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
  padding-bottom: 120px;
}
.media-title {
  color: #FF3B33;
  font-size: 2rem;
  text-align: center;
}
.media {
  width: 100%;
  display: grid;
  grid-template-areas: 'a' 'b' 'c' 'd' 'e' 'f' 'g' 'h';
  row-gap: 51px;
  column-gap: 1rem;
  margin-top: 50px;
  & > div {
    max-height: 78px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  for area, i in a b c d e f g h {
    .brand-{i + 1} {
      grid-area: area ;
    }
  }
}

@media (min-width: 500px) {
  .media {
    grid-template-areas: 'a a b b' 'c c d d' 'e e f f' 'g g h h';
  }
}

@media (min-width: 1200px) {
  .media-title {
    font-size: 40px;
  }
  .media {
    margin-top: 150px;
    grid-template-areas: 'a a b b c c' '. d d e e .' 'f f g g h h';
  }
}
</style>
