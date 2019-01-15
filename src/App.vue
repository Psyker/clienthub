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
  export default {
    components: { AppHeader }
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
