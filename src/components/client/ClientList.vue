<template>
    <ApolloQuery :query="require('../../graphql/queries/client/ClientList.graphql')">
        <template slot-scope="{ result: { data, loading } }">
            <PulseLoader v-if="loading" color="cornflowerblue"/>
            <ul class="client-list" v-else-if="data && data.clients">
                <li class="client-item" v-for="client in data.clients.edges" :key="client.node.id">
                    <router-link :to="{ name: 'client.view', params: { slug: client.node.slug } }">
                        {{ client.node.name }}
                    </router-link>
                    <div class="client-infos">
                        <p>Adresse: {{ client.node.address }}, {{ client.node.zipCode }}</p>
                        <div class="interventions-count">
                            <p>Interventions prévues : {{ client.node.interventions.length }}</p>
                            <p>
                               Interventions terminées :
                               {{ client.node.interventions.filter(intervention => intervention.inProgress).length }}
                           </p>
                       </div>
                    </div>
                </li>
            </ul>
            <div v-else-if="data && !data.clients">
                Aucun clients, pour le moment ;)
            </div>
        </template>
    </ApolloQuery>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader';
    export default {
        name: "client-list",
        components: {
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
        @include breakpoint(mobile) {
            padding: 0;
            flex-direction: column;
        }
        .client-item {
            margin-right: 10px;
            box-shadow: 10px 12px 15px -18px #b9b9b9;
            border-radius: 5px;
            flex-flow: column;
            display: inherit;
            background-color: white;
            transition: all 0.3s;
            padding: 20px;
            align-self: center;
            height: 200px;
            width: 400px;
            margin-bottom: 30px;
            &:hover {
                box-shadow: 10px 15px 15px -7px #b9b9b9;
            }
            .client-infos {
                display: inherit;
                flex-flow: inherit;
                justify-content: center;
                text-align: left;
            }
            @include breakpoint(mobile) {
                width: 100%;
                margin-right: 0;
            }
        }
    }
</style>
