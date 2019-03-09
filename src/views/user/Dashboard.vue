<template>
    <main class="container">
        <div class="home-page">
            <vue-headful title="ClientHub - Dashboard"></vue-headful>
            <h1>Dashboard</h1>
            <div class="module-header">
                <h3>Liste des clients</h3>
                <router-link :to="{ name: 'client.new' }">Ajouter un client</router-link>
            </div>
            <client-list/>
        </div>

    </main>
</template>

<script>
    // @ is an alias to /src
    import VueHeadful from "vue-headful";
    import ClientList from "../../components/client/ClientList"

    export default {
        name: 'dashboard',
        props: {
            slug: {type: String, required: false}
        },
        components: {
            VueHeadful,
            ClientList
        },
    }
</script>

<style lang="scss" scoped>
    .module-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 190px;
        @include breakpoint(mobile) {
            padding: 0;
        }
    }
</style>


