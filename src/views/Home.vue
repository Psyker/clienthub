<template>
  <main class="container">
    <div class="home-page">
      <vue-headful title="ClientHub - Liste des clients"></vue-headful>
      <h1>Liste des clients</h1>
      <client-list/>
    </div>

  </main>
</template>

<script>
// @ is an alias to /src
import VueHeadful from "vue-headful";
import ClientList from "../components/client/ClientList"

export default {
  name: 'home',
  components: {
    VueHeadful,
    ClientList
  }
}
</script>

Keyboard
const letters =[]

  div
    letters.map((letter, index)) => {
        return Touch :letter=letter :key=index
    })
  /div


