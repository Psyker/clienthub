<template>
    <ApolloQuery :query="require('../../graphql/queries/client/ClientViewQuery.graphql')" :variables="{slug}">
        <template slot-scope="{ result: { data, loading, gqlError } }">
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
    import ClientForm from "../../components/client/form/ClientForm";

    export default {
        name: "EditClientView",
        components: {
            ClientForm
        },
        props: {
            slug: {type: String, required: false}
        },
        methods: {
            onEdit() {
                this.$toasted.show('✅ Le client à bien été édité. Vous allez être redirigé vers le dashboard ...', {
                    theme: 'bubble',
                    position: 'bottom-right',
                    duration: 2500,
                    closeOnSwipe: true,
                    className: "clienthub-toast",
                });
                setTimeout(() => {
                    window.location.replace('/dashboard');
                }, 3000)

            }
        }
    }
</script>

<style lang="scss" scoped>
    .edition-page {
        margin-top: $navbar-height;
    }
</style>