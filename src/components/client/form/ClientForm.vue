<template>
    <b-form @submit.prevent="handleSubmit" method="post">
        <b-form-group id="name-input-group" label="Nom" label-for="name-input">
            <b-form-input
                    id="name-input"
                    type="text"
                    v-model="form.name"
                    required
                    placeholder="Nom du client" />
        </b-form-group>
        <b-form-group id="segment-input-group" label="Secteur d'activité" label-for="segment-input">
            <b-form-select
                    v-model="form.businessSegments.selected"
                    :options="form.businessSegments.options"
                    required
                    id="segment-input"
            >
            </b-form-select>
        </b-form-group>
        <b-form-group id="address-input-group" label="Adresse du client" label-for="address-input">
            <b-form-input
                    id="adress-input"
                    type="text"
                    v-model="form.address"
                    required
                    placeholder="17 Rue des Bois" />
        </b-form-group>
        <b-form-group id="city-input-group" label="Ville du client" label-for="city-input">
            <b-form-input
                    id="city-input"
                    type="text"
                    v-model="form.city"
                    required
                    placeholder="Paris" />
        </b-form-group>
        <b-form-group id="zipcode-input-group" label="Code postal" label-for="zipcode-input">
            <b-form-input
                    id="zipcode-input"
                    type="number"
                    v-model="form.zipCode"
                    required
                    placeholder="75002" />
        </b-form-group>
        <b-form-group id="description-input-group" label="Description" label-for="description-input">
            <b-form-textarea
                    v-model="form.description"
                    id="description-input"
                    placeholder="Description du client ..."
                    rows="3"
                    max-rows="8"
            ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" :disabled="loading" variant="primary">
            <b v-if="!loading">Sauvegarder</b>
            <b-spinner v-else variant="light" label="Spinning" />
        </b-button>
    </b-form>
</template>

<script>
    export default {
        name: "client-form",
        props: {
            client: {type: Object, required: false}
        },
        data() {
            return {
                form: {
                    name: '',
                    address: '',
                    city: '',
                    description: '',
                    zipCode: null,
                    businessSegments: {
                        selected: null,
                        options: []
                    }
                },
                loading: false,
                gqlError: null
            }
        },
        created() {
            if (this.client) {
                this.form.name = this.client.name;
                this.form.address = this.client.address;
                this.form.zipCode = this.client.zipCode;
                this.form.city = this.client.city;
                this.form.description = this.client.description;
                this.form.businessSegments.selected = this.client.businessSegment.name
            }
        },
        apollo: {
            businessSegments: {
                query: require('../../../graphql/queries/BusinessSegmentsQuery.graphql'),
                result({data: {businessSegments}}) {
                    this.form.businessSegments.options = businessSegments.map(segment => {
                        return {value: segment.name, text: segment.name}
                    })
                }
            }
        },
        methods: {
            done() {
                if (!this.client) {
                    this.form.name = '';
                    this.form.address = '';
                    this.form.zipCode = '';
                    this.form.city = '';
                    this.form.description = '';
                    this.$emit('created')
                } else {
                    this.$emit('edited')
                }
            },
            handleSubmit() {
                let params = {
                    input: {
                        name: this.form.name,
                        address: this.form.address,
                        zip_code: this.form.zipCode,
                        city: this.form.city,
                        description: this.form.description
                    }
                };
                this.loading = true;
                if (this.client) {
                    params.input.client = this.client.slug;
                }
                this.$apollo.mutate({
                    mutation: this.client
                        ? require('../../../graphql/mutations/client/EditClientMutation.graphql')
                        : require('../../../graphql/mutations/client/AddClientMutation.graphql'),
                    variables: params
                }).then((loading, gqlError) => {
                    this.loading = loading;
                    this.gqlError = gqlError;
                    this.done()
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>