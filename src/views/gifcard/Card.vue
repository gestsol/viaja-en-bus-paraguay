<template>
  <section class="card-container">
    <v-card class="mx-auto">
      <div class="card-img">
        <div class="card-price">
          <div class="card-content card-subtitle pb-0">
            <p>Gifcard con saldo de</p>
          </div>

          <p class="card-content card-title">{{ card.balance | currency }}.-</p>

          <div class="card-content card-subtitle pb-0">
            <p>para compras de pasajes online.</p>
          </div>
        </div>

        <div class="card-content card-text">paga sólo {{ card.price | currency }}.-</div>

        <button @click="$emit('pay', card)">
          <span>La Quiero</span>
        </button>
      </div>

      <v-card-actions class="card-footer">
        <img src="/static/imgs/logos/name-cybermonday.png" alt="logo cybermonday" />
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'VbCard',

  props: {
    card: Object,
    required: false
  }
}
</script>

<style lang="stylus">
.card-container
  .card
    border-radius 15px
    text-align center

.card-img
  background-image url('/static/imgs/background/contact-circuit.png')
  background-size cover
  background-position center
  background-repeat no-repeat
  height 300px
  display flow-root

.card-img button
  background-color #ED4043 !important
  color white !important
  padding 5px 40px
  border-radius 10px
  font-size 20px
  box-shadow 2px 2px 6px 0px white
  &:hover
    position relative
    box-shadow none
    transition all 0.15s ease-in
  &:focus
    outline none

.card-price
  background-color #124EA8
  margin 25px
  margin-bottom 0
  padding 5px 10px
  border-radius 15px

.card-content
  color white
  text-align center

.card-title
  font-weight 600
  font-size 48px
  margin 0

.card-subtitle
  font-size 500
  font-size 15px

.card-text
  font-weight 600
  font-size 20px
  margin-bottom 10px

.card-footer
  background-color var(--var-light-blue)
  img
    width 30%
</style>
