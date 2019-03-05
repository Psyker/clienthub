<template>
    <main class="container">
        <div class="home-page">
            <vue-headful title="ClientHub - Dashboard"></vue-headful>
            <h1>Dashboard</h1>
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
        components: {
            VueHeadful,
            ClientList
        }
    }
</script>


