<template>
    <b-form @submit.prevent="handleSubmit">
        <b-form-group id="name-input-group" label="Nom" label-for="name-input">
            <b-form-input
                    id="name-input"
                    type="text"
                    v-model="form.name"
                    required
                    placeholder="Nom du client" />
        </b-form-group>
        <b-form-group id="address-input-group" label="Adresse du client" label-for="address-input">
            <b-form-input
                    id="exampleInput2"
                    type="text"
                    v-model="form.address"
                    required
                    placeholder="17 Rue des Bois, Paris" />
        </b-form-group>
        <b-form-group id="zipcode-input-group" label="Code postal" label-for="zipcode-input">
            <b-form-input
                    id="zipcode-input"
                    type="number"
                    v-model="form.zipCode"
                    required
                    placeholder="75002" />
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
                    zipCode: null,
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
            }
        },
        methods: {
            done() {
                if (!this.client) {
                    this.form.name = '';
                    this.form.address = '';
                    this.form.zipCode = '';
                    this.$emit('created')
                } else {
                    this.$emit('edited')
                }
            },
            handleSubmit() {
                let params = {input: {name: this.form.name, address: this.form.address, zip_code: this.form.zipCode}};
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