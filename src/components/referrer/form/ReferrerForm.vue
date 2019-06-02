<template>
    <b-form @submit.prevent="handleSubmit" method="post">
        <b-form-group id="name-input-group" label="Prénom" label-for="firstname-input">
            <b-form-input
                    id="firstname-input"
                    type="text"
                    v-model="form.firstname"
                    required
                    placeholder="Jean" />
        </b-form-group>
        <b-form-group id="lastname-input-group" label="Nom" label-for="lastname-input">
            <b-form-input
                    v-model="form.lastname"
                    required
                    type="text"
                    placeholder="Dujardin" />
        </b-form-group>
        <b-form-group id="job-input-group" label="Poste" label-for="job-input">
            <b-form-input
                    v-model="form.job"
                    required
                    type="text"
                    placeholder="CTO chez CoolRobot" />
        </b-form-group>
        <b-form-group id="email-input-group" label="Email" label-for="email-input">
            <b-form-input
                    v-model="form.email"
                    required
                    type="text"
                    placeholder="john.doe@gmail.com" />
        </b-form-group>
    </b-form>
</template>

<script>
    export default {
        name: "referrer-form",
        props: {
            referrer: {type: Object, required: false}
        },
        data() {
            return {
                form: {
                    firstname: '',
                    lastname: '',
                    job: '',
                    email: ''
                },
                loading: false,
                gqlError: null
            }
        },
        created() {
            if (this.referrer) {
                this.form.firstname = this.referrer.firstname;
                this.form.lastname = this.referrer.lastname;
                this.form.job = this.referrer.job;
                this.form.email = this.referrer.email
            }
        },
        methods: {
            done() {
                if (!this.referrer) {
                    this.form.firstname = '';
                    this.form.lastname = '';
                    this.form.job = '';
                    this.form.email = '';
                    this.$emit('created')
                } else {
                    this.$emit('edited')
                }
            },
            handleSubmit() {
               let params = {
                   input: {
                       firstname: this.form.firstname,
                       lastname: this.form.lastname,
                       job: this.form.job,
                       email: this.form.email
                   }
               }
               this.loading = true;
               if (this.referrer) {
                   params.input.client = this.client.slug
               }
               this.$apollo.mutate({
                   mutation: this.client
                       ? require('../../../graphql/mutations/referrer/EditReferrerMutation.graphql')
                       : require('../../../graphql/mutations/referrer/AddReferrerMutation.graphql'),
                   variables: params
               }).then((loading, gqlError) => {
                   this.loading = loading;
                   this.gqlError = gqlError;
                   this.done()
               })
            }
        }
    }
</script>

<style scoped>

</style>
