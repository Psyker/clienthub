<template>
    <ApolloQuery :query="require('../../graphql/queries/client/ClientViewQuery.graphql')" :variables="{slug}">
        <template slot-scope="{ result: { data, loading, gqlError } }">
            <vue-headful v-if="data && data.client" :title="'ClientHub - Édition ' + data.client.name"></vue-headful>
            <b-container>
                <h1>Éditer le client</h1>
                <ClientForm v-on:edited="onEdit" v-if="data && data.client" :client="data.client"/>
                <div v-else>{{gqlError}}</div>
            </b-container>
        </template>
    </ApolloQuery>
</template>

<script>
    import ClientForm from "../../components/client/form/ClientForm";

    export default {
        name: "edit-client-page",
        components: {ClientForm},
        props: {
            slug: {type: String, required: false}
        },
        methods: {
            onEdit() {
                this.$toasted.show('✅ Le client à bien été édité. Vous allez être redirigé vers le dashboard ...', {
                    theme: 'bubble',
                    position: 'bottom-right',
                    duration: 1500,
                    closeOnSwipe: true,
                    className: "clienthub-toast",
                });
                setTimeout(() => {
                    this.$router.push('/dashboard')
                }, 1600)

            },
        }
    }
</script>

<style lang="scss" scoped>
</style>