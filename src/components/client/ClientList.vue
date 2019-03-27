<template>
    <b-table v-if="items" striped hover :items="items" :fields="fields" />
    <!--<PulseLoader v-if="$apollo.queries.clients.loading" color="cornflowerblue"/>
    <ul class="client-list" v-else-if="clients && clients.edges.length > 0">
        <ClientItem v-for="client in clients.edges"
                    :client="client.node"
                    :key="client.node.id"
                    v-on:deleted="onDelete"
        />
    </ul>
    <div v-else-if="clients && clients.edges.length === 0">
        Aucun clients, pour le moment ;)
    </div>-->
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
        data() {
            return {
                fields: {
                    name: {
                        label: "Nom de l'entreprise",
                        sortable: true
                    },
                    address: {
                        label: "Adresse",
                        sortable: false,
                    },
                    zipCode: {
                        label: "Code postal",
                        sortable: true
                    },
                    createdAt: {
                        label: "Date de création",
                        sortable: true
                    },
                    updatedAt: {
                        label: "Date de mise à jour",
                        sortable: true
                    }
                },
                items: []
            }
        },
        methods: {
            onDelete() {
                this.$apollo.queries.clients.refetch()
            }
        },
        apollo: {
            clients: {
                query: require('../../graphql/queries/client/ClientList.graphql'),
                result({data: { clients } }) {
                    this.items = clients.edges.map((node) => {
                        return {
                            name: node.node.name,
                            address: node.node.address,
                            zipCode: node.node.zipCode,
                            createdAt: node.node.createdAt,
                            updatedAt: node.node.updatedAt
                        }
                    })
                }
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
