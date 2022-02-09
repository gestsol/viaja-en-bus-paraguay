<template>
  <div class="bus-font" :style="windowSize.x < 600 ? 'margin-bottom: 55px;' : 'margin-bottom: 64px;'">
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      :drawer="drawer"
      dark
      disable-resize-watcher
      temporary
      class="drawer"
      width="340"
    >
      <v-container>
        <v-list>
          <v-list-group v-for="item in sidePanelItems" :value="item.active" :key="item.title" class="noTextDecoration">
            <v-list-tile slot="item" @click="$router.push({ path: item.path })">
              <v-list-tile-action>
                <template v-if="item.icon.indexOf('static') > 0">
                  <img class="drawerBtnLogo" :src="item.icon" />
                </template>
                <template v-else>
                  <v-icon>{{ item.icon }}</v-icon>
                </template>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  <span>{{ item.title }}</span>
                </v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action v-if="item.items">
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              @click="subItemAction(subItem, item.action)"
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  <span>{{ subItem.title }}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-container>
    </v-navigation-drawer>

    <v-toolbar
      :fixed="true"
      :class="{ header_transparent: !logo, header_solid: logo }"
      class="elevation-5 px-0"
      style="z-index: 6; overflow: hidden"
    >
      <v-toolbar-side-icon
        class="displayNoneTiny white--text"
        @click.stop="drawer = !drawer"
        :dark="!logo"
        id="toolbarDrawer"
      ></v-toolbar-side-icon>
      <v-layout row class="px-2 mx-0">
        <v-flex xs2 sm2 style="overflow: hidden">
          <v-toolbar-items>
            <v-btn
              flat
              :dark="!logo"
              small
              class="white--text"
              :style="windowSize.x <= 960 ? 'min-width: 0px; width: 100%' : ''"
              @click="openDialog = true"
            >
              <img src="/static/imgs/logos/Contacto.png" class="headerBtnLogo" />
              <span class="hidden-sm-and-down header-text white--text capitalize" v-lang.contact></span>
            </v-btn>
          </v-toolbar-items>
        </v-flex>

        <v-flex xs2 sm1 v-if="windowSize.x > 600 && sidePanelItems.find(item => item.title === 'Cybermonday')">
          <v-toolbar-items>
            <v-btn flat :dark="!logo" small class="white--text" @click="$router.push({ name: 'gifcard' })">
              <span class="cybermonday">CYBERMONDAY</span>
            </v-btn>
          </v-toolbar-items>
        </v-flex>

        <v-flex xs2 sm1 v-else-if="windowSize.x > 600" />

        <v-flex xs6 offset-xs1 sm7 offset-sm0 class="text-center">
          <v-layout row>
            <v-flex md3 xs12 class="logo-vb">
              <v-toolbar-items>
                <v-btn flat :dark="!logo" small @click="$router.push({ path: '/' })">
                  <img v-if="logo" src="/static/imgs/logos/logo boletos paraguay.svg" alt class="principalLogo" />
                </v-btn>
              </v-toolbar-items>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs0 sm1 />

        <v-flex xs2 sm3>
          <v-layout row style="height: 100%;">
            <template v-if="windowSize.x <= 600">
              <v-flex xs6 offset-xs6>
                <v-toolbar-items>
                  <v-btn
                    flat
                    :dark="!logo"
                    @click.stop="drawer = !drawer"
                    class="white--text"
                    style="width: 50px; min-width: 0px"
                  >
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-flex>
            </template>

            <template v-else>
              <v-flex xs3 sm6 md9 offset-xs3 offset-sm0 offset-md4>
                <v-toolbar-items>
                  <template v-if="Object.keys(user.usuario).length <= 0">
                    <v-btn flat :dark="!logo" small class="white--text" @click="$router.push({ path: '/login' })">
                      <img src="/static/imgs/logos/Quienes-somos.png" class="headerBtnLogo" />
                      <span class="hidden-sm-and-down header-text capitalize" v-lang.login></span>
                    </v-btn>
                  </template>

                  <template v-else>
                    <v-menu bottom offset-y style="display: flex; height: 100%; align-items: center;">
                      <v-btn flat :dark="!logo" slot="activator" class="white--text">
                        <img src="/static/imgs/logos/Quienes-somos.png" class="headerBtnLogo" />
                        <span class="hidden-sm-and-down header-text capitalize" v-lang.my_account></span>
                        <v-icon>arrow_drop_down</v-icon>
                      </v-btn>

                      <v-list>
                        <v-list-tile @click="$router.push({ name: 'my_profile' })">
                          <v-list-tile-title v-lang.my_profile></v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile @click="signOut">
                          <v-list-tile-title v-lang.sign_out></v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </template>
                </v-toolbar-items>
              </v-flex>

              <!-- <v-flex xs3 sm6 md3 offset-xs3 offset-sm0 offset-md1>
                <v-toolbar-items>
                  <v-btn flat :dark='!logo' small class="white--text">
                    <img src='/static/imgs/logos/Fenabus-logo.png' class="fenabusLogo"/>
                  </v-btn>
                </v-toolbar-items>
              </v-flex> -->
            </template>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-toolbar>

    <v-snackbar
      class="mt-5"
      :timeout="2000"
      :top="true"
      :right="true"
      color="primary"
      multi-line="multi-line"
      v-model="snackbarLanguage"
    >
      <span v-lang.language_msg></span>
    </v-snackbar>

    <!-- MODAL-CONTACT -->
    <contact-hubspot :dialog="openDialog" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactHubspot from '@v/contact/ContactHubspot'

export default {
  props: {
    logo: {
      type: Boolean,
      default: true
    }
  },

  components: {
    ContactHubspot
  },

  data() {
    return {
      openDialog: false,
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      snackbarLanguage: false,
      drawer: null
    }
  },
  computed: {
    ...mapGetters({
      user: ['userData']
    }),
    sidePanelItems() {
      let profileRoutes = {}
      if (Object.keys(this.user.usuario).length <= 0) {
        profileRoutes = {
          icon: 'perm_contact_calendar',
          title: this.translate('login'),
          path: '/login'
        }
      } else {
        profileRoutes = {
          icon: 'perm_contact_calendar',
          title: this.translate('my_account'),
          action: this.accountAction,
          items: [
            {
              title: this.translate('my_profile'),
              path: '/profile/my_profile',
              type: 'my_profile'
            },
            {
              title: this.translate('sign_out'),
              type: 'sign_out'
            }
          ]
        }
      }
      return [
        {
          icon: 'home',
          title: this.translate('home'),
          path: '/'
        },
        // {
        //   icon: 'monetization_on',
        //   title: 'Cybermonday',
        //   path: '/gifcard'
        // },
        {
          icon: 'info',
          title: this.translate('informations'),
          items: [
            {
              title: this.translate('term_of_use'),
              path: '/info/term_of_use'
            },
            {
              title: this.translate('privacy'),
              path: '/info/privacy'
            },
            {
              title: this.translate('faq'),
              path: '/info/faq'
            }
          ]
        },
        {
          icon: '/static/imgs/logos/Formas-de-pago.png',
          title: this.translate('payment_types'),
          items: [
            {
              title: this.translate('payment_methods'),
              path: '/payments/methods'
            }
            // {
            //   title: this.translate('where_to_buy'),
            //   path: '/payments/where'
            // },
            // {
            //   title: this.translate('how_to_buy'),
            //   path: '/payments/how'
            // }
          ]
        },
        {
          icon: '/static/imgs/logos/Quienes-somos.png',
          title: this.translate('us'),
          path: '/about_us'
        },
        // {
        //   icon: 'web',
        //   title: this.translate('blog'),
        //   path: 'https://blog.pasajeschile.cl/',
        //   target: '_blank'
        // },
        // {
        //   icon: 'dock',
        //   title: this.translate('totems'),
        //   path: 'totem'
        // },
        // {
        //   icon: '/static/imgs/logos/Nuestros-partners.png',
        //   title: this.translate('our_partnes'),
        //   path: '/partners'
        // },
        profileRoutes,
        {
          icon: 'language',
          title: 'Idioma/Language',
          action: this.languageAction,
          items: [
            {
              title: 'Español'
            },
            {
              title: 'English'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.changeLanguage(this.$store.state.language, true)
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResizeHeader)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResizeHeader)
  },
  methods: {
    subItemAction(item, cb) {
      if (item.path) {
        this.$router.push({ path: item.path })
        return
      }
      if (cb) {
        cb(item)
      }
    },
    signOut() {
      this.$store.dispatch('DELETE_USER')
      this.$router.push({ path: '/' })
    },
    onResizeHeader() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    accountAction(item) {
      if (item.type === 'sign_out') {
        this.signOut()
      }
    },
    languageAction(item) {
      if (item.title === 'Español') {
        this.changeLanguage('es')
      } else {
        this.changeLanguage('en')
      }
    },
    changeLanguage(lang, firstLoad) {
      if (!firstLoad) {
        this.snackbarLanguage = true
      }
      this.$store.dispatch('SET_USER_LANGUAGE', { language: lang })
      this.language = lang
    }
  }
}
</script>

<style>
/* .bus-font {
  margin-bottom: 64px;
} */

.cybermonday {
  padding: 5px 10px;
  background-color: #7296f7;
  border-radius: 20px;
}

.logo-vb {
  margin: auto;
}

.principalLogo {
  height: 6rem;
}

.header-text {
  font-size: 16px !important;
  font-weight: bold;
}

#toolbarDrawer i {
  font-size: 25px !important;
}

.drawerBtnLogo {
  margin-top: 0.5rem;
  height: 1.5rem;
  width: 2rem;
}

.headerBtnLogo {
  margin-top: 0rem;
  height: 1.7rem;
  width: 2.4rem;
}

nav.header_transparent.toolbar {
  background-color: rgba(23, 30, 51, 0.56);
}

nav .toolbar__content {
  height: 80px !important;
}

nav.header_solid.toolbar {
  background-color: var(--var-dark-blue);
}

.drawer {
  background-color: var(--var-dark-blue) !important;
  z-index: 7 !important;
}

.noTextDecoration a {
  text-decoration: none;
}
</style>
