<template>
    <main class="client-page">
        <PulseLoader v-if="this.$apollo.queries.client.loading" color="cornflowerblue"/>
        <div v-else-if="client">
            <vue-headful :title="'ClientHub - ' + client.name"></vue-headful>
            <div class="jumbotron">
                <h1>{{ client.name }}</h1>
                <div>Crée le {{client.createdAt|moment("DD/MM/YYYY")}}</div>
                <div v-if="client.updatedAt">Mis à jour le {{client.updatedAt|moment("DD/MM/YYYY")}}</div>
            </div>
            <div class="container">
                <div class="referrer-list">
                    <h2>Référrants</h2>
                    <div class="referrer-item" v-for="referrer in client.referrers" :key="referrer.id">
                        <p>Prénom: {{ referrer.firstname }}</p>
                        <p>Nom: {{referrer.lastname}}</p>
                        <p>Email: {{referrer.email}}</p>
                        <p>N°: {{referrer.phone}}</p>
                        <p>Poste: {{referrer.job}}</p>
                    </div>
                    <p v-if="client.referrers.length === 0">Aucun référrants.</p>
                </div>
                <div class="timeline">
                    <h2>Interventions
                        <router-link :to="{name: 'intervention.new', slug: client.slug}"
                                     class="intervention-action-creation">Ajouter une intervention
                        </router-link>
                    </h2>
                    <div v-for="(timelinePart, idx) in orderedInterventions" :key="idx">
                        <p v-if="!orderedInterventions[idx - 1] || orderedInterventions[idx - 1].year !== timelinePart.year">
                            <b>{{timelinePart.year}}</b>
                        </p>
                        {{timelinePart.month}}
                        <ul class="intervention-list">
                            <li class="intervention-item" v-for="intervention in timelinePart.interventions"
                                :key="intervention.id">
                                <p>{{ intervention.startAt|moment('DD/MM/YYYY hh:mm:ss') }} -
                                    {{intervention.endAt|moment('DD/MM/YYYY hh:mm:ss')}}</p>
                                <p>Type: {{intervention.type.name}}</p>
                                <p>En cours: {{intervention.inProgress ? 'Oui' : 'Non'}}</p>
                                <div class="actions" v-if="intervention">
                                    <router-link :to="{name: 'intervention.edit', params: {slug: client.slug, id: intervention.id}}">
                                        <icon name="edit"></icon>
                                    </router-link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <p v-if="orderedInterventions.length === 0">Aucune interventions.</p>
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
        components: {VueHeadful, PulseLoader},
        props: {
            slug: {type: String, required: true}
        },
        data() {
            return {
                client: null,
                orderedInterventions: []
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
                    this.orderedInterventions = [];
                    client.interventions.edges.map((intervention, idx) => {
                        if (
                            client.interventions.edges[idx - 1] !== undefined
                            && this.$moment(intervention.node.startAt).isSame(client.interventions.edges[idx - 1].node.startAt, 'month')
                        ) {
                            this.orderedInterventions.find((element) => {
                                return element.month === this.$moment(intervention.node.startAt).format('MMMM')
                                    && element.year === this.$moment(intervention.node.startAt).format('YYYY')
                            }).interventions.push(intervention.node);
                        } else {
                            this.orderedInterventions.push({
                                month: this.$moment(intervention.node.startAt).format('MMMM'),
                                year: this.$moment(intervention.node.startAt).format('YYYY'),
                                interventions: [intervention.node]
                            })
                        }
                    });
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .client-page {
        margin-top: $navbar-height;

        .container {
            margin: 0 auto;
            padding: 40px;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-around;
            @include breakpoint(mobile) {
                flex-direction: column;
            }
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

        .timeline {
            display: flex;
            flex-grow: 2;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            padding: 0 50px 0px 10px;
            margin-top: 20px;
            border-left: 5px solid cornflowerblue;
            @include breakpoint(mobile) {
                padding: 0 0 0 10px;
            }

            .intervention-list {
                list-style: none;
                padding: 0;
                width: 100%;

                .intervention-item {
                    text-align: center;
                    box-shadow: 10px 12px 15px -18px #b9b9b9;
                    padding: 20px;
                    background-color: white;
                    border-radius: 4px;
                    margin-bottom: 10px;
                    .actions {
                        svg {
                            width: 30px;
                            height: 100%;
                            transform: scale3d(0.8, 0.8, 0.8);
                            margin-left: 16px;
                            display: inline-block;
                        }
                    }
                }

                & :last-child {
                    margin-bottom: 0;
                }
            }

            h2 {
                display: flex;
                justify-content: space-between;
            }

            .intervention-action-creation {
                text-align: right;
                border: none;
                font-size: 14px;
                background-color: whitesmoke;
                cursor: pointer;
            }
        }

        .referrer-list {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            margin-top: 20px;

            .referrer-item {
                box-shadow: 10px 12px 15px -18px #b9b9b9;
                background-color: white;
                padding: 20px;
            }
        }
    }

</style>
