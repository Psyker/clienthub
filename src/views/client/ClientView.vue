<template>
    <main class="container client-page">
        <ApolloQuery :query="require('../../graphql/queries/ClientViewQuery.graphql')" :variables="{slug}">
            <template slot-scope="{ result: { data, loading } }">
                <div v-if="loading">
                    Damn
                </div>
                <div v-else-if="data && data.client">
                    {{data.client.name}}
                </div>
            </template>
        </ApolloQuery>
    </main>

</template>

<script>
    export default {
        name: "client-view",
        props: {
            slug: { type: String, required: true }
        },
    }
</script>

<style scoped>

</style>
