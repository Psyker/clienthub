<template>
    <ApolloQuery :query="require('../../graphql/queries/ClientList.graphql')">
        <template slot-scope="{result: {data, loading} }">
            <ul class="client-list" v-if="data">
                <li v-for="client in data.clients.edges" :key="client.node.id">
                    {{ client.node.name }}
                </li>
            </ul>
        </template>
    </ApolloQuery>
</template>

<script>
    export default {
        name: "ClientList"
    }
</script>

<style scoped>

</style>