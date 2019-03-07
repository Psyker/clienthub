<template>
    <ApolloQuery :query="require('../../graphql/queries/client/ClientList.graphql')">
        <template slot-scope="{ result: { data, loading } }">
            <PulseLoader v-if="loading" color="cornflowerblue"/>
            <ul class="client-list" v-else-if="data && data.clients">
                <ClientItem v-for="client in data.clients.edges" :client="client.node" :key="client.node.id" />
            </ul>
            <div v-else-if="data && !data.clients">
                Aucun clients, pour le moment ;)
            </div>
        </template>
    </ApolloQuery>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader';
    import ClientItem from "./ClientItem";
    export default {
        name: "client-list",
        components: {
            ClientItem,
            PulseLoader
        }
    }
</script>

<style lang="scss" scoped>
    .client-list {
        display: flex;
        flex-flow: row wrap;
        list-style: none;
        padding: 0 170px;
        justify-content: center;
        @include breakpoint(mobile) {
            padding: 0;
            flex-direction: column;
        }
    }
</style>
