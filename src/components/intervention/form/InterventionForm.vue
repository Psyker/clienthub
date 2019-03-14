<template>
    <main>
        <form @submit.prevent="handleSubmit" class="intervention-form" method="post">
            <div class="form-input">
                <label for="startAt">Date de début</label>
                <input id="startAt" name="startAt" placeholder="Date de début" type="datetime-local" v-model="startAt">
            </div>
            <div class="form-input">
                <label for="endAt">Date de fin</label>
                <input id="endAt" name="endAt" placeholder="Date de fin" type="datetime-local" v-model="endAt">
            </div>
            <div class="form-input">
                <label for="type">Type d'intervention</label>
                <ApolloQuery :query="require('../../../graphql/queries/intervention/InterventionTypesQuery.graphql')">
                    <template slot-scope="{result: {loading, error, data}}">
                        <select v-if="!loading && data && data.interventionTypes" name="type" id="type"
                                v-model="interventionType">
                            <option v-for="type in data.interventionTypes.edges" :value="type.node.name"
                                    :key="type.node.id">{{type.node.name}}
                            </option>
                        </select>
                    </template>
                </ApolloQuery>
            </div>
            <button @click.prevent="handleSubmit">Sauvegarder</button>
        </form>
    </main>
</template>

<script>
    export default {
        name: "InterventionForm",
        props: {
            intervention: {type: Object, required: false},
            client: {type: Object, required: true}
        },
        data() {
            return {
                startAt: '',
                endAt: '',
                interventionType: ''
            }
        },
        created() {
            if (this.intervention) {
                this.startAt = this.$moment(this.intervention.startAt, 'DD/MM/YYYY hh:mm');
                this.endAt = this.$moment(this.intervention.endAt, 'DD/MM/YYYY hh:mm');
                this.interventionType = this.intervention.type.name;
            }
        },
        methods: {
            handleSubmit() {
                this.$apollo.mutate({
                    mutation: require('../../../graphql/mutations/intervention/AddInterventionMutation.graphql'),
                    variables: {
                        input: {
                            startAt: this.startAt,
                            endAt: this.endAt,
                            client: this.client.id,
                            type: this.interventionType
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .intervention-form {
        margin: 0 auto;
    }
</style>