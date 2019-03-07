<template>
    <li class="client-item">
        <router-link :to="{ name: 'client.view', params: { slug: client.slug } }">
            {{ client.name }}
        </router-link>
        <div class="client-infos">
            <p>Adresse: {{ client.address }}, {{ client.zipCode }}</p>
            <div class="interventions-count">
                <p>Interventions prévues : {{ client.interventions.length }}</p>
                <p>
                    Interventions terminées :
                    {{ client.interventions.filter(intervention => intervention.inProgress).length }}
                </p>
            </div>
        </div>
        <div class="actions">
            <router-link :to="{ name: 'client.edit', params: { slug: client.slug } }">Éditer</router-link>
            <router-link :to="{ name: 'client.view', params: { slug: client.slug } }">Voir</router-link>
        </div>
    </li>
</template>

<script>
    export default {
        name: "ClientItem",
        props: {
            client: {type: Object, required: true}
        }
    }
</script>

<style lang="scss" scoped>
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
</style>