<template>
    <div class="ServicesBackground">
        <v-content class="displayNoneSm">
            <BannerTop />
        </v-content>


        <!-- Falta transition 'fade' -->
        <!-- 

            <v-btn fab dark :large="windowSize.x > 960" color="primarylight" @click="showResume"
            class="floating-resume-btn">
            <v-icon dark>shopping_cart</v-icon>
        </v-btn>
         -->




        <h2>Servicios</h2>

        <p>{{ servicio }}</p>


        <div style="margin-top: 100px" class="displayNoneMd"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BannerTop from '@c/BannerTop'
import SearchPanel from '@v/services/SearchPanel/searchPanel'

export default {
    components: {
        BannerTop,
    },
    computed: {
        ...mapGetters({
            servicio: ['getTravelsList',]
        }),
    },
    mounted() {
        this.$store.dispatch('LOAD_TRAVELS_LIST')
    }

}
</script>

<style>
</style>