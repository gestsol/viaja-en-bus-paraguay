<template>
  <div class="bus-font" :class="{'px-5':windowSize.x > 576}">
    <v-layout xs12 sm12 md8 lg6>
      <v-flex >
        <div class="mt-1 service-container-background">
          <v-toolbar dark class="blue-dark" id="serviceToolbar">
            <v-toolbar-title>
              <span :class="{'body-1': windowSize.x <= 960}">
                {{translate('outbound_service')}}: {{searching.from_city.nombre}} {{translate('to')}} {{searching.to_city.nombre}}
              </span>
            </v-toolbar-title>
            <v-spacer class="displayNoneSm"></v-spacer>
            <v-text-field
              v-if="services && services.length > 0"
              append-icon="search"
              :label="langSearch"
              single-line
              v-model="search"
              class="displayNoneSm mt-4"
              color="grey lighten-4"
            ></v-text-field>
          </v-toolbar>
          <template v-if="hasVuelta">
            <v-tabs fixed centered v-model="active">
              <v-tabs-bar class="primary" dark>
                <v-tabs-item
                  v-for="i in tabs"
                  :key="i"
                  :href="'#tab-' + i"
                  class="pa-0 tabButton"
                >
                  <v-btn
                  style="width: 100%; height: 100%;"
                  class="ma-0"
                  :class="i === 'Ida' ? 'mr-1': 'ml-1'"
                  color="primarymedium"
                  :outline="selectedTab !== i"
                  @click="selectedTab = i">
                    <span class="white--text">
                      {{ i }}
                    </span>
                  </v-btn>
                </v-tabs-item>
              </v-tabs-bar>
              <v-tabs-items>
                <v-tabs-content id="tab-Ida">
                  <List :search="search"/>
                </v-tabs-content>
                <v-tabs-content id="tab-Vuelta">
                  <List :search="search" :back="true"/>
                </v-tabs-content>
              </v-tabs-items>
            </v-tabs>
          </template>
          <List v-else :search="search" :back="false"/>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
/* eslint-disable */
import List from "@v/services/stepper/List/ElementList";
import { mapGetters } from "vuex";
import moment from "moment";
import _ from 'lodash'

export default {
  components: {
    List
  },
  data() {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      //Button
      search: '',
      tabs: ['Ida', 'Vuelta']
    };
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize);
  },
  computed: {
    ...mapGetters({
      services: ['getServiceList'],
      searching: ['getSearching']
    }),
    hasVuelta () {
      const services = this.services(true)
      return services.length > 0
    },
    selectedTab: {
      get () {
        return this.$store.state.services.tab
      },
      set (tab) {
        this.$store.dispatch('SET_SERVICE_TAB', {tab})
      }
    },
    active () {
      return 'tab-' + this.selectedTab
    },
    langSearch () {
      return this.translate('search')
    }
  },
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    }
  }
};
</script>

<style >
.tabButton a{
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.icon-service-expanded {
  transform: rotate(90deg);
}

.icon-service {
  color: var(--var-red);
  font-size: 30px;
}

@media (max-width: 1060px) {
  .stepper__content {
    padding: 0px !important;
  }
}

@media (max-width: 1060px) {
  .expansion-panel__header {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
.service-item {
  margin-top: 10px;
  padding-top: 0;
  padding-bottom: 0;
}

.service-container-background {
  background-color: var(--var-light) !important;
}

.blue-dark {
  background-color: var(--var-dark-blue);
}

.noServices {
  min-height: 25vh;
}
.arrow .expansion-panel__header .icon {
  color: rgba(63, 12, 182, 0.54);
  font-size: 60px;
}

.arrow .expansion-panel__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  height: 110px;
}

.card__text {
  padding: 2px !important;
  width: 100%;
}


.result h1, h2, h3 {
  font-weight: 300 !important;
}

.datatable-container {
  background-color: white;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.15), 0 1px 10px 0 rgba(0, 0, 0, 0.15),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.datatable thead th.column.sortable {
  cursor: pointer;
}

/* estilo Bus */
.border-bus {
  border-bottom: 0px solid gray;
  border-top: 0px solid gray;

}

.min-h-30 {
  min-height: 30px;
}

.maxHeightLayout {
  max-height: 55vh;
  min-height: 55vh;
  overflow-y: scroll;
}
/* tamañp de grilla */
.flex.xs1 {
    -ms-flex-preferred-size: 4.333333333333332% !important;
    flex-basis: 4.333333333333332% !important;
    max-width: 4.333333333333332% !important;
    }

/* . estilo Bus */
</style>
