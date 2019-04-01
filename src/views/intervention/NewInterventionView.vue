<template>
    <ApolloQuery :query="require('../../graphql/queries/client/ClientViewQuery.graphql')" :variables="{slug}">
        <template slot-scope="{ result: { data, loading } }">
            <b-container>
                <h1>Créer une nouvelle intervention</h1>
                <InterventionForm v-on:created="onCreate" v-if="data && data.client && !loading" :client="data.client" />
            </b-container>
        </template>
    </ApolloQuery>
</template>

<script>
    import InterventionForm from "../../components/intervention/form/InterventionForm";
    export default {
        name: "new-intervention-view",
        props: {
            slug: {type: String, required: true}
        },
        components: {
            InterventionForm
        },
        methods: {
            onCreate() {
                this.$toasted.show('✅ L\'intervention à bien été crée. Vous allez être redirigé vers la page du client ...', {
                    theme: 'bubble',
                    position: 'bottom-right',
                    duration: 1500,
                    closeOnSwipe: true,
                    className: "clienthub-toast",
                });
                setTimeout(() => {
                    this.$router.push('/dashboard')
                }, 1600)

            }
        }
    }
</script>

<style scoped>

</style>