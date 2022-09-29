<template>
  <div class="container answers">
    <answer-item v-for="(item, i) of items" v-bind="item" :key="i" />
  </div>
</template>
<script>
import AnswerItem from './AnswerItem'

const imagePrefix = '/static/imgs/home/Answer '

export default {
  components: {
    AnswerItem
  },

  data: () => ({
    items: [
      {
        title: 'Viajeros felices',
        description: '4,8 millones',
        image: `${imagePrefix}1.svg`
      },
      {
        title: 'Excelente servicio',
        description: '+ 5000 comentarios de satisfacción',
        image: `${imagePrefix}2.svg`
      },
      {
        title: 'Muchos recorridos',
        description: 'Más de 300 destinos',
        image: `${imagePrefix}3.svg`
      },
      {
        title: 'Viajeros felices',
        description: '7,3 millones',
        image: `${imagePrefix}4.svg`
      }
    ]
  })
}
</script>
<style lang="stylus" scoped>
.answers {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 126px 30px 0 30px;
  gap: 2rem;
}
</style>

