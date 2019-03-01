<template>
    <main class="container client-page">
        <ApolloQuery :query="require('../../graphql/queries/client/ClientViewQuery.graphql')" :variables="{slug}">
            <template slot-scope="{ result: { data, loading } }">
                <div v-if="loading">
                    Damn
                </div>
                <div v-else-if="data && data.client">
                    <vue-headful :title="'ClientHub - ' + data.client.name"></vue-headful>
                    {{data.client.name}}
                </div>
            </template>
        </ApolloQuery>
    </main>

</template>

<script>
    import VueHeadful from "vue-headful";

    export default {
        name: "client-view",
        components: { VueHeadful },
        props: {
            slug: { type: String, required: true }
        },
    }
</script>

<style scoped>

</style>
