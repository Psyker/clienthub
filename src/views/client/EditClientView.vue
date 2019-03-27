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
    .edition-page {
        margin-top: $navbar-height;
        h1 {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        .button-primary {
            margin-left: 20px;
            background-color: white;
            border: none;
            padding: 20px;
            font-size: 16px;
        }
    }
</style>