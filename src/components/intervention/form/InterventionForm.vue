<template>
    <b-form @submit.prevent="handleSubmit" method="post">
        <b-form-group class="inline-group" id="start-input-group" label="Début de l'intervention">
            <b-form-input
                    type="date"
                    id="start-date-input"
                    v-model="form.startAt.date"
                    :state="dateValidator"
            />
            <b-form-input
                    type="time"
                    id="start-time-input"
                    v-model="form.startAt.time"
            />
            <b-form-invalid-feedback :state="dateValidator">
                La date de début doit être inférieur à la date de fin
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="inline-group" id="end-input-group" label="Fin de l'intervention">
            <b-form-input
                    type="date"
                    id="end-date-input"
                    v-model="form.endAt.date"
                    :state="dateValidator"
            />
            <b-form-input
                    type="time"
                    id="end-time-input"
                    v-model="form.endAt.time"
            />
            <b-form-invalid-feedback :state="dateValidator">
                La date de fin doit être supérieur à la date de début
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="type-input-group" label="Type d'intervention" label-for="type-input">
            <b-form-select
                    v-model="form.interventionTypes.selected"
                    :options="form.interventionTypes.options"
                    required
                    id="type-input"
            >
            </b-form-select>
        </b-form-group>
        <b-button type="submit" :disabled="loading" variant="primary">
            <b v-if="!loading">Sauvegarder</b>
            <b-spinner v-else variant="light" label="Spinning" />
        </b-button>
    </b-form>
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
                form: {
                    startAt: {
                        date: '',
                        time: ''
                    },
                    endAt: {
                        date: '',
                        time: ''
                    },
                    interventionTypes: {
                        selected: null,
                        options: []
                    }
                },
                loading: false,
                gqlError: null
            }
        },
        computed: {
            dateValidator() {
                if (this.form.startAt.date !== '' && this.form.endAt.date !== '') {
                    let startDate = this.$moment(`${this.form.startAt.date + ' ' + this.form.startAt.time}`, 'YYYY/MM/DD HH:mm').unix();
                    let endDate = this.$moment(`${this.form.endAt.date + ' ' + this.form.endAt.time}`, 'YYYY/MM/DD HH:mm').unix();

                    return startDate < endDate;
                }

                return null
            }
        },
        apollo: {
            interventionTypes: {
                query: require('../../../graphql/queries/intervention/InterventionTypesQuery.graphql'),
                result({data: {interventionTypes}}) {
                    this.form.interventionTypes.options = interventionTypes.edges.map(type => {
                        return {value: type.node.slug, text: type.node.name}
                    })
                }
            }
        },
        created() {
            // if (this.intervention) {
            //     this.startAt = this.$moment(this.intervention.startAt, 'DD/MM/YYYY hh:mm');
            //     this.endAt = this.$moment(this.intervention.endAt, 'DD/MM/YYYY hh:mm');
            //     this.interventionType = this.intervention.type.name;
            // }
        },
        methods: {
            done() {
                if (!this.intervention) {
                    this.form.startAt.date = '';
                    this.form.startAt.time = '';
                    this.form.endAt.date = '';
                    this.form.endAt.time = '';
                    this.form.interventionTypes.selected = null;
                    this.$emit('created')
                } else {
                    this.$emit('edited')
                }
            },
            handleSubmit() {
                let startDate = this.$moment(`${this.form.startAt.date + ' ' + this.form.startAt.time}`, 'YYYY/MM/DD HH:mm');
                let endDate = this.$moment(`${this.form.endAt.date + ' ' + this.form.endAt.time}`, 'YYYY/MM/DD HH:mm');
                this.loading = true;
                this.$apollo.mutate({
                    mutation: require('../../../graphql/mutations/intervention/AddInterventionMutation.graphql'),
                    variables: {
                        input: {
                            startAt: startDate,
                            endAt: endDate,
                            client: this.client.id,
                            type: this.form.interventionTypes.selected
                        }
                    }
                }).then((loading, gqlError) => {
                    this.loading = loading;
                    this.gqlError = gqlError;
                    this.done()
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .inline-group > div {
        display: flex;
        flex-direction: row;
        input {
            display: inline;
            width: auto;
        }
    }
</style>