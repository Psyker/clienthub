<template>
    <ApolloQuery :query="require('../../graphql/queries/ClientList.graphql')">
        <template slot-scope="{ result: { data, loading } }">
            <div v-if="loading">
                Damn
            </div>
            <ul class="client-list" v-else-if="data && data.clients">
                <li class="client-item" v-for="client in data.clients.edges" :key="client.node.id">
                    <router-link :to="{ name: 'client.view', params: { slug: client.node.slug } }">
                        {{ client.node.name }}
                    </router-link>
                </li>
            </ul>
            <div v-else-if="data && !data.clients">
                Damn again.
            </div>
        </template>
    </ApolloQuery>
</template>

<script>
    export default {
        name: "ClientList"
    }
</script>

<style lang="scss" scoped>
    .client-list {
        display: flex;
        flex-flow: row wrap;
        list-style: none;
        justify-content: space-around;
        padding: 0;
        @include breakpoint(mobile) {
            flex-direction: column;
        }
        .client-item {
            padding: 0;
            align-self: center;
            height: 250px;
            width: 400px;
            @include breakpoint(mobile) {
                width: 100%;
            }
        }
    }
</style>
