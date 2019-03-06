<template>
    <main class="container client-page">
        <ApolloQuery :query="require('../../graphql/queries/client/ClientViewQuery.graphql')" :variables="{slug}">
            <template slot-scope="{ result: { data, loading } }">
                <PulseLoader v-if="loading" color="cornflowerblue"/>
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
    import PulseLoader from 'vue-spinner/src/PulseLoader'

    export default {
        name: "client-view",
        components: { VueHeadful, PulseLoader },
        props: {
            slug: { type: String, required: true }
        },
    }
</script>

<style scoped>

</style>
