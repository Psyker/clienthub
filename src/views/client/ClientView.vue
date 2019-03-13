<template>
    <main class="client-page">
        <PulseLoader v-if="this.$apollo.queries.client.loading" color="cornflowerblue"/>
        <div v-else-if="client">
            <vue-headful :title="'ClientHub - ' + client.name"></vue-headful>
            <div class="jumbotron">
                <h1>{{client.name}}</h1>
                <div>Crée le {{client.createdAt|moment("DD/MM/YYYY")}}</div>
                <div v-if="client.updatedAt">Mis à jour le {{client.updatedAt|moment("DD/MM/YYYY")}}</div>
            </div>
            <div class="container">
                <div v-for="intervention in client.interventions.edges" :key="intervention.id">
                    {{ intervention.node.startAt }}
                </div>
            </div>
        </div>
    </main>

</template>

<script>
    import VueHeadful from "vue-headful";
    import PulseLoader from 'vue-spinner/src/PulseLoader'
    export default {
        name: "client-view",
        components: { VueHeadful, PulseLoader },
        props: {
            slug: { type: String, required: true }
        },
        data() {
            return {
                client: null
            }
        },
        apollo: {
            client: {
                query: require('../../graphql/queries/client/ClientViewQuery.graphql'),
                variables() {
                    return {
                        slug: this.slug
                    }
                },
                result({data: {client}}) {
                    console.log(client)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .client-page {
        margin-top: $navbar-height;
        .container {
            padding: 0 40px;
        }
        .jumbotron {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 400px;
            width: 100%;
            background-color: cornflowerblue;
            color: white;
            h1 {
                margin: 0 auto;
            }
        }
        .intervention-list {
            list-style: none;
            padding: 0;
            .month {
                border: none;
                margin: 10px 0 10px 0;
            }
        }
    }

</style>
