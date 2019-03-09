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
            <router-link :to="{ name: 'client.edit', params: { slug: client.slug } }"><icon name="edit"></icon></router-link>
            <router-link :to="{ name: 'client.view', params: { slug: client.slug } }"><icon name="eye"></icon></router-link>
            <a href="#" @click.prevent="handleDelete"><icon name="trash"></icon></a>
        </div>
    </li>
</template>

<script>
    export default {
        name: "ClientItem",
        props: {
            client: {type: Object, required: true}
        },
        methods: {
            handleDelete() {
                this.$apollo.mutate({
                    mutation: require('../../graphql/mutations/DeleteClientMutation.graphql'),
                    variables: {input: {id: this.client.id}}
                }).then(() => {
                    this.$toasted.show('🗑 Le client à bien été supprimé.', {
                        theme: 'bubble',
                        position: 'bottom-right',
                        duration: 2500,
                        closeOnSwipe: true,
                        className: "clienthub-toast",
                    });
                    this.$emit('deleted');
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .client-item {
        position: relative;
        margin-right: 10px;
        box-shadow: 10px 12px 15px -18px #b9b9b9;
        border-radius: 5px;
        flex-flow: column;
        display: inherit;
        background-color: white;
        transition: all 0.3s;
        padding: 20px;
        align-self: center;
        height: 250px;
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
            margin-top: 15px;
        }
        @include breakpoint(mobile) {
            width: 100%;
            margin-right: 0;
        }
        .actions {
            position: absolute;
            bottom: 15px;
            right: 0;
            left: 0;
            svg {
                width: 30px;
                height: 100%;
                transform: scale3d(0.8, 0.8, 0.8);
                margin-left: 16px;
                display: inline-block;
            }
            .button-primary {
                border: none;
                background-color: white;
                padding: 0;
            }
        }
    }
</style>