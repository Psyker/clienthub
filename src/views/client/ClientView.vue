<template>
    <b-container fluid v-if="!$apollo.queries.client.loading">
        <vue-headful title="ClientHub - Client" ></vue-headful>
        <b-row>
            <b-col class="sidebar" cols="3">
                <div class="sidebar-card">
                    <b-row class="horizontaly-centered">
                        <div>
                            <icon name="home"/>
                            <h2>{{client.name}}</h2>
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
                            <p><b>{{client.name}}</b></p>
                        </b-list-group-item>
                        <b-list-group-item>
                            <small>Description</small>
                            <p>
                                <b>{{this.currentDescription}}</b>
                                <button v-if="!readMore" v-on:click="handleReadMore">...</button>
                            </p>
                        </b-list-group-item>
                        <b-list-group-item>
                            <small>Secteur d'activité</small>
                            <p><b>{{client.businessSegment.name}}</b></p>
                        </b-list-group-item>
                        <b-list-group-item>
                            <small>Adresse</small>
                            <p><b>{{client.address}}</b></p>
                        </b-list-group-item>
                        <b-list-group-item>
                            <small>Ville</small>
                            <p><b>{{client.city}}</b></p>
                        </b-list-group-item>
                        <b-list-group-item>
                            <small>Code postal</small>
                            <p><b>{{client.zipCode}}</b></p>
                        </b-list-group-item>
                        <b-list-group-item>
                            <small>Téléphone</small>
                            <p><b>{{client.phone}}</b></p>
                        </b-list-group-item>
                        <b-list-group-item>
                            <small>Date d'ajout</small>
                            <p><b>{{client.createdAt}}</b></p>
                        </b-list-group-item>
                        <b-list-group-item>
                            <small>Dernière mise à jour</small>
                            <p><b>{{client.updatedAt}}</b></p>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
            <b-col cols="6 overflow-scroll">
                <b-tabs content-class="mt-3 ">
                    <b-tab title="Interventions" active>
                        <div class="timeline scrollable">
                            <div v-for="(timelinePart, idx) in orderedInterventions" :key="idx">
                                <p v-if="!orderedInterventions[idx - 1] || orderedInterventions[idx - 1].year !== timelinePart.year">
                                    <b>{{timelinePart.year}}</b>
                                </p>
                                <p>{{timelinePart.month}}</p>
                                <b-list-group class="intervention-list">
                                    <b-list-group-item
                                            class="intervention-item"
                                            v-for="intervention in timelinePart.interventions"
                                            :key="intervention.id">
                                        <p>Intervention</p>
                                        <p>{{ intervention.startAt|moment('DD/MM/YYYY hh:mm:ss') }} -
                                            {{intervention.endAt|moment('DD/MM/YYYY hh:mm:ss')}}</p>
                                        <p>Type: {{intervention.type.name}}</p>
                                        <p>En cours: {{intervention.inProgress ? 'Oui' : 'Non'}}</p>
                                        <div class="actions" v-if="intervention">
                                            <router-link :to="{name: 'intervention.edit', params: {slug: client.slug, id: intervention.id}}">
                                                <icon name="edit"></icon>
                                            </router-link>
                                        </div>
                                    </b-list-group-item>
                                </b-list-group>
                            </div>
                        </div>
                    </b-tab>
                    <b-tab title="second"><p>I'm the second tab content</p></b-tab>
                </b-tabs>

            </b-col>
            <b-col class="sidebar">
                <div class="sidebar-list contact-list">
                    <h3 class="text-left">Contacts</h3>
                    <b-list-group v-if="client.referrers.length > 0">
                        <b-list-group-item class="text-left" v-for="referrer in client.referrers" :key="referrer.id">
                            <p><icon name="user"/>Nom Prénom: <span class="highlight">{{referrer.firstname}} {{referrer.lastname}}</span></p>
                            <p><icon name="award"/>Poste: {{referrer.job}}</p>
                            <p><icon name="mail"/>Email: <span class="highlight">{{referrer.email}}</span></p>
                        </b-list-group-item>
                    </b-list-group>
                    <p v-else>Aucun contacts.</p>
                    <b-button variant="primary">Ajouter un contact</b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
    <b-spinner class="spinner" v-else variant="dark" label="Spinning" type="grow" />
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
                readMore: false,
                currentDescription: '',
                orderedInterventions: []
            }
        },
        methods: {
            handleReadMore() {
                this.readMore = !this.readMore;
                this.currentDescription = this.client.description;

                return true;
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
                        this.currentDescription = client.description.substr(0, 50)
                    });
                },
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
        border-right: 1px solid #dfe3eb;
        border-left: 1px solid #dfe3eb;
        background-color: white;
        .sidebar-card {
            padding: 30px;
            border-bottom: 1px solid #dfe3eb;
            h2 {
                margin-top: 8px;
                font-size: 24px;
            }
        }
        .sidebar-list {
            padding: 20px;
            &.contact-list {
                border-bottom: 1px solid #dfe3eb;
                .list-group-item {
                    margin: 15px 0 25px 0;
                    svg.icon {
                        width: 20px;
                        height: 20px;
                        margin-right: 0.5rem;
                        color: black;
                    }
                    border: 1px solid lightgrey;
                    padding: 10px;
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

    .timeline {
        text-align: left;
        .intervention-list {
            .intervention-item {
                text-align: left;
                margin-bottom: 10px;
            }
        }
        svg.icon {
            width: 20px;
            height: 20px;
        }
    }

    .spinner {
        margin: 0 auto;
        height: 200px;
        width: 200px;
    }

    .overflow-scroll {
        overflow-y: scroll;
        height: 100vh;
    }
</style>
