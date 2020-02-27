// src/App.vue
<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    > Vinvin
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
          </v-row>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('auth/authenticate').catch(error => {
      if (!error.message.includes('Could not find stored JWT')) {
        console.error(error)
      }
    })
  },
  methods: {
    login () {
      window.location = 'http://localhost:3030/oauth/connect/auth0'
    }
  },
  computed: {
    ...mapGetters('auth', [
      'user'
    ])
  }
}
</script>
