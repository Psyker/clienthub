<template>
    <ApolloQuery :query="require('../../graphql/queries/client/ClientViewQuery.graphql')" :variables="{slug}">
        <template slot-scope="{ result: { data, loading, gqlError } }">
            <vue-headful v-if="data && data.client" :title="'ClientHub - Édition ' + data.client.name"></vue-headful>
            <main class="container">
                <div class="edition-page">
                    <h1>Éditer le client</h1>
                    <ClientForm v-on:edited="onEdit" v-if="data && data.client" :client="data.client"/>
                    <div v-else>{{gqlError}}</div>
                </div>
            </main>
        </template>
    </ApolloQuery>
</template>
<script>
    export default {
        name: "edit-intervention-page"
    }
</script>

<style scoped>

</style>