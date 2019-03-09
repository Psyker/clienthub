<template>
    <PulseLoader v-if="$apollo.queries.clients.loading" color="cornflowerblue"/>
    <ul class="client-list" v-else-if="clients && clients.edges.length > 0">
        <ClientItem v-for="client in clients.edges"
                    :client="client.node"
                    :key="client.node.id"
                    v-on:deleted="onDelete"
        />
    </ul>
    <div v-else-if="clients && clients.edges.length === 0">
        Aucun clients, pour le moment ;)
    </div>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader';
    import ClientItem from "./ClientItem";
    export default {
        name: "client-list",
        components: {
            ClientItem,
            PulseLoader
        },
        methods: {
            onDelete() {
                this.$apollo.queries.clients.refetch()
            }
        },
        apollo: {
            clients: {
                query: require('../../graphql/queries/client/ClientList.graphql'),
            }
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
