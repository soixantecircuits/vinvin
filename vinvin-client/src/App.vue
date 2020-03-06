// src/App.vue
<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      >
      <v-toolbar-title>Vinvin</v-toolbar-title>
      <v-spacer />
      <v-menu
        offset-y
        >
        <template v-slot:activator="{ on: menu }">
          <v-btn
            icon
            large
            v-on="{ ...menu }"
            >
            <v-avatar
              size="40px"
              item
              >
              <v-img
                :src="(user && user.picture) || dummyUser.picture"
                alt="User avatar"
                />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-flag</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Plan: {{ planName }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            @click="logout"
            >
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height"
        fluid
        >
        <v-row
          align="center"
          justify="center"
          >
          <v-btn
            v-if="!user"
            large
            color="primary"
            @click="login"
            >Login
          </v-btn>
          <v-btn
            v-if="user && !hasPlan"
            large
            color="pink"
            @click="checkout"
            >Subscribe
          </v-btn>
          <v-btn
            v-if="user && hasPlan"
            large
            @click="hit"
            >Hit
          </v-btn>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadStripe } from '@stripe/stripe-js'
import _ from 'lodash'

export default {
  name: 'App',
  data: () => ({
    dummyUser: {
      picture: '//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png'
    }
  }),
  mounted () {
    this.$store.dispatch('auth/authenticate').catch(error => {
      if (!error.message.includes('Could not find stored JWT')) {
        console.error(error)
      }
    })
    this.$intercom.boot({})
    this.$intercom.show()
  },
  methods: {
    login () {
      window.location = 'http://localhost:3030/oauth/connect/auth0'
    },
    logout () {
      this.$store.dispatch('auth/logout')
    },
    async checkout () {
      const session = await this.$store.dispatch('subscription/create', {})
      const stripe = await loadStripe('pk_test_*******')
      stripe.redirectToCheckout({ sessionId: session.id })
    },
    hit: function () {
      this.$intercom.trackEvent('Hit button')
    }
  },
  computed: {
    ...mapGetters('auth', [
      'user'
    ]),
    hasPlan () {
      return _.get(this.user, 'stripe.subscriptions.data.0.status') === 'active'
    },
    planName () {
      return _.get(this.user, 'stripe.subscriptions.data.0.plan.nickname', 'free')
    }
  },
  watch: {
    user () {
      if (this.user) {
        this.$intercom.update(this.user)
      }
    }
  }
}
</script>
