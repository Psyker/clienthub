<template>
    <b-container fluid>
        <b-row>
            <b-col class="sidebar" cols="3">
                <div class="sidebar-card">
                    <b-row class="horizontaly-centered">
                        <div>
                            <icon name="home"/>
                            <h2>Vaillant et Fils</h2>
                            <b-link>www.site.com</b-link>
                        </div>
                    </b-row>
                    <b-row>

                    </b-row>
                </div>
                <div class="sidebar-list text-left">
                    <h3>À propos de ce client :</h3>
                    <b-list-group>
                        <b-list-group-item>
                            <small>Nom</small>
                            <p><b>Dapibus ac facilisis in</b></p>
                        </b-list-group-item>
                        <b-list-group-item>
                            <small>Adresse</small>
                            <p><b>17 Rue Saint Louis, Villemomble</b></p>
                        </b-list-group-item>
                        <b-list-group-item>
                            <small>Code postal</small>
                            <p><b>93150</b></p>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
            <b-col cols="6">2 of 3 (wider)</b-col>
            <b-col class="sidebar">
                <div class="sidebar-list contact-list">
                    <h3 class="text-left">Contacts</h3>
                    <b-list-group>
                        <b-list-group-item class="text-left">
                            <p><icon name="user"/>Nom Prénom: <span class="highlight">Jean DuJardin</span></p>
                            <p><icon name="award"/>Poste: Développeur</p>
                            <p><icon name="mail"/>Email: <span class="highlight">jean@gmail.com</span></p>
                        </b-list-group-item>
                    </b-list-group>
                    <b-button variant="primary">Ajouter un contact</b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
    <!--<main>
        <PulseLoader v-if="this.$apollo.queries.client.loading" color="cornflowerblue"/>
        <div v-else-if="client">
            <vue-headful :title="'ClientHub - ' + client.name"></vue-headful>
            &lt;!&ndash;<div class="jumbotron">
                <h1>{{ client.name }}</h1>
                <div>Crée le {{client.createdAt|moment("DD/MM/YYYY")}}</div>
                <div v-if="client.updatedAt">Mis à jour le {{client.updatedAt|moment("DD/MM/YYYY")}}</div>
            </div>&ndash;&gt;
            <div>
                <b-jumbotron text-variant="white"
                             :header="client.name"
                             :lead="'Crée le ' + client.createdAt|moment('DD/MM/YYYY')"
                />
            </div>
            <b-container>
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
            </b-container>
        </div>
    </main>-->
</template>

<script>
    import VueHeadful from "vue-headful";

    export default {
        name: "client-view",
        components: {VueHeadful},
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
    .sidebar {
        h3 {
            font-size: 16px;
        }
        padding: 0;
        height: calc(100vh - 40px);
        border-right: 1px solid lightgrey;
        background-color: white;
        .sidebar-card {
            padding: 30px;
            border-bottom: 1px solid lightgrey;
            h2 {
                margin-top: 8px;
                font-size: 24px;
            }
        }
        .sidebar-list {
            padding: 20px;
            &.contact-list {
                border-bottom: 1px solid lightgrey;
                .list-group-item {
                    svg.icon {
                        width: 20px;
                        height: 20px;
                        margin-right: 0.5rem;
                        color: black;
                    }
                    border: 1px solid lightgrey;
                    padding: 10px;
                    margin-bottom: 10px;
                    .highlight {
                        color: cornflowerblue;
                    }
                }
            }
            .list-group-item {
                border: none;
                padding-left: 0;
                padding-bottom: 0;
                p {
                    margin-bottom: 0;
                }
            }
        }
    }
    .horizontaly-centered {
        justify-content: center;
    }
    svg.icon {
        width: 60px;
        height: 60px;
    }
</style>
