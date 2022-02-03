import Vue from 'vue'
import store from '../store/store'
import Router from 'vue-router'

// Informations
import TOU from '@v/informations/Term_of_use'
import Privacy from '@v/informations/Privacy'
import FAQ from '@v/informations/FAQ'

// Payments
import Methods from '@v/payments/Methods'
// import How from '@v/payments/How'
// import Where from '@v/payments/Where'

// About Us
import AboutUs from '@v/about_us/AboutUs'

// About Us
// import Partners from '@v/partners/Partners'

// Totem
import Totem from '@v/totem/Totem'

// Home
import Home from '@v/home/Home'

// Contact
import Contact from '@v/contact/Contact'
import Success from '@v/contact/Success'

// Login
import Login from '@v/login/Login'
import SignUp from '@v/login/SignUp'
import SendPassword from '@v/login/SendPassword'
import ChangePassword from '@v/login/ChangePassword'

// Profile
import Profile from '@v/profile/Index'
import Purchases from '@v/profile/Purchases'
import PersonalData from '@v/profile/PersonalData'
import CancelPurchase from '@v/profile/CancelPurchase'
import ProfilePassword from '@v/profile/ProfilePassword'

// Services
import Confirmation from '@v/services/Confirmation'
import Voucher from '@v/services/Voucher'
import Fail from '@v/services/Fail'
import ServicesContainer from '@v/services/Index'
import ListContainer from '@v/services/Services'
import Data from '@v/services/stepper/ConfirmationPaymentData'
import List from '@v/services/stepper/List/Index'
import Payment from '@v/services/Payment/Index'
// import Wbpay from '@v/services/wbpay'

// Mobile routes
import MobileFilters from '@v/services/filters/MobileFilters'
import MobileSearchPanel from '@v/services/MobileSearchPanel'

import Error404 from '@v/ErrorPages/Error404.vue'

// Otras Vistas
import Gifcard from '@v/gifcard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/exito',
      name: 'success',
      component: Success
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: SignUp
    },
    {
      path: '/change_pass',
      name: 'change_pass',
      component: ChangePassword
    },
    {
      path: '/send_pass',
      name: 'send_pass',
      component: SendPassword
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesContainer,
      children: [
        {
          path: '/',
          component: ListContainer,
          children: [
            {
              path: '/',
              name: 'List',
              component: List
            },
            {
              path: 'servicesPaymentData',
              name: 'ServicesPaymentData',
              component: Data
            }
          ]
        },
        {
          path: '/payment/:type',
          name: 'Payment',
          component: Payment
        }
      ]
    },
    {
      path: '/filters',
      name: 'filters',
      component: MobileFilters
    },
    {
      path: '/mobile_search',
      name: 'mobile_search',
      component: MobileSearchPanel
    },
    {
      path: '/confirmation/:id',
      name: 'confirmation',
      component: Confirmation
    },
    {
      path: '/voucher/:id',
      name: 'voucher',
      component: Voucher
    },
    {
      path: '/fail/:id',
      name: 'fail',
      component: Fail
    },
    // {
    //   path: '/wbpay',
    //   name: 'wbpay',
    //   component: Wbpay
    // },
    {
      path: '/info/term_of_use',
      name: 'term_of_use',
      component: TOU
    },
    {
      path: '/info/faq',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/info/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/payments/methods',
      name: 'payments_methods',
      component: Methods
    },
    // {
    //   path: '/payments/how',
    //   name: 'how_buy',
    //   component: How
    // },
    // {
    //   path: '/payments/where',
    //   name: 'where_buy',
    //   component: Where
    // },
    {
      path: '/about_us',
      name: 'about_us',
      component: AboutUs
    },
    // {
    //   path: '/partners',
    //   name: 'partners',
    //   component: Partners
    // },
    {
      path: '/totem',
      name: 'totem',
      component: Totem
    },
    {
      path: '/profile',
      component: Profile,
      children: [
        {
          name: 'my_profile',
          path: 'my_profile',
          component: PersonalData
        },
        {
          name: 'purchases',
          path: 'purchases',
          component: Purchases
        },
        {
          name: 'cancel_purchase',
          path: 'cancel_purchase',
          component: CancelPurchase
        },
        {
          name: 'profile_pass',
          path: 'password',
          component: ProfilePassword
        }
      ]
    },
    {
      path: '/gifcard',
      name: 'gifcard',
      component: Gifcard
    },
    {
      path: '/*',
      component: Error404
    }
  ]
})
router.afterEach((to, from) => {
  store.dispatch('SET_HISTORY', { from, to })
})
export default router
