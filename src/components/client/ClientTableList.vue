<template>
    <div class="client-table">
        <b-table responsive v-if="items" striped hover :items="items" :fields="fields" >
            <template slot="name" slot-scope="data">
                <b-link :to="{name: 'client.view', params: {slug: data.item.slug}}">{{data.item.name}}</b-link>
            </template>
            <template slot="actions" slot-scope="data">
                <b-link size="sm" @click.prevent="() => confirmDelete(data.item.id)" class="mr-2">
                    <icon name="trash" color="black"/>
                </b-link>
                <b-link size="sm" :to="{name: 'client.edit', params: {slug: data.item.slug}}">
                    <icon name="edit" color="black"></icon>
                </b-link>
            </template>
        </b-table>
        <v-dialog/>
    </div>
</template>

<script>
    export default {
        name: "client-table-list",
        data() {
            return {
                fields: {
                    name: {
                        label: "Nom de l'entreprise",
                        sortable: true
                    },
                    address: {
                        label: "Adresse",
                        sortable: true,
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
                    },
                    actions: {
                        "label": "Actions"
                    }
                },
                items: [],
                deleteId: null
            }
        },
        methods: {
            confirmDelete(clientId) {
                this.deleteId = clientId;
                this.$modal.show('dialog', {
                    title: 'Confirmer la suppression',
                    text: 'Voulez vous vraiment supprimer ce client ? 😱',
                    buttons: [
                        {
                            title: 'Oui',
                            default: true,
                            handler: this.handleDelete
                        },
                        {
                            title: 'Non',
                        },
                    ]
                })
            },
            handleDelete() {
                this.$apollo.mutate({
                    mutation: require('../../graphql/mutations/client/DeleteClientMutation.graphql'),
                    variables: {input: {id: this.deleteId}}
                }).then(() => {
                    this.$toasted.show('🗑 Le client à bien été supprimé.', {
                        theme: 'bubble',
                        position: 'bottom-right',
                        duration: 2500,
                        closeOnSwipe: true,
                        className: "clienthub-toast",
                    });
                    this.$modal.hide('dialog');
                    this.$apollo.queries.clients.refetch()
                })
            },
        },
        apollo: {
            clients: {
                query: require('../../graphql/queries/client/ClientList.graphql'),
                result({data: { clients } }) {
                    this.items = clients.edges.map((node) => {
                        return {
                            id: node.node.id,
                            name: node.node.name,
                            address: node.node.address,
                            zipCode: node.node.zipCode,
                            createdAt: node.node.createdAt,
                            updatedAt: node.node.updatedAt,
                            slug: node.node.slug
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .client-table {
        width: 100%;
    }
    svg.icon {
        display: inline;
        width: 20px;
        height: 20px;
        margin-right: .3rem;
    }
</style>
