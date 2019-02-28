<template>
  <div id="app">
    <app-header/>
    <transition name="fade-up" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import AppHeader from './components/ui/AppHeader'
  import { EVENT_LOGIN, EVENT_LOGOUT } from "./constants";
  import { SET_LOGGED_IN } from "./store/modules/user/mutations";
  import { EventBus } from "./main"
  import { mapMutations } from "vuex";
  import {onLogin, onLogout} from "./vue-apollo";

  export default {
    components: { AppHeader },
    methods: {
      ...mapMutations("user", [SET_LOGGED_IN])
    },
    created() {
      EventBus.$on(EVENT_LOGIN, async ({ token, referrer }) => {
        onLogin(
          this.$apolloProvider.defaultClient,
          token,
          referrer
        );
      });
      EventBus.$on(EVENT_LOGOUT, async (token, referrer) => {
        onLogout(this.$apolloProvider.defaultClient, referrer)
      })
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
