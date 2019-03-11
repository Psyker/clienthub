<template>
  <main class="container">
    <vue-headful title="ClientHub - Accueil" description="Manage your clients, create bills, save time."/>
    <div class="container-jumbotron">
      <img src="../assets/img/undraw_businessman_97x4.svg" alt="">
      <div class="container-title">
        <h1>ClientHub</h1>
        <h2>Manage your clients, create bills, save time.</h2>
        <button>Commencer</button>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'home',
  }
</script>

<style scoped lang="scss">
  .container-jumbotron {
    display: flex;
    position: relative;

    .container-title {
      position: absolute;
      right: 30%;
      top: 35%;
      bottom: 30%;
      @include breakpoint(mobile) {
        top: 0;
        right: 0;
        left: 0;
      }
      @include breakpoint(tablet) {
        right: 5%;
      }
      @media (min-width: 768px) {
        right: 10%;
      }
    }

    button {
      color: white;
      border: none;
      background-color: cornflowerblue;
      padding: 10px 20px;
      border-radius: 3px;
    }

    img {
      height: 100%;
      max-width: 100%;
      margin-left: 10%;
      @include breakpoint(mobile) {
        margin-left: 0;
      }
      @include breakpoint(tablet) {
        max-width: 60%;
        margin-left: 0;
      }
      @media (min-width: 768px) {
        max-width: 60%;
        margin-left: 0;
      }
    }
  }
</style>


