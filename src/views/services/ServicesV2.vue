<template>
    <div>
        <h2>asddsaasdsda</h2>

        <p>{{ services }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

    computed: {
        ...mapGetters({
            services: ['getTravelsList',]
        }),
    },
    mounted() {
        this.$store.dispatch('LOAD_TRAVEL_LIST')

    }

}
</script>

<style>
</style>