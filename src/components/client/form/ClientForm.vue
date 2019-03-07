<template>
    <main>
        <form @submit.prevent="handleSubmit" class="client-form" method="post">
            <div class="form-input">
                <input name="name" placeholder="Nom du client" type="text" v-model="name">
            </div>
            <div class="form-input">
                <input name="address" placeholder="Adresse du client" type="text" v-model="address">
            </div>
            <div class="form-input">
                <input name="name" placeholder="Code postal" type="text" v-model="zipCode">
            </div>

            <button :disabled="loading" @submit.prevent="handleSubmit" class="button-primary"
                    type="submit">
                <PulseLoader color="cornflowerblue" v-if="loading"/>
                <span v-else>Sauvegarder</span>
            </button>
        </form>
    </main>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader'

    export default {
        name: "client-form",
        components: {PulseLoader},
        props: {
            client: {type: Object, required: false}
        },
        data() {
            return {
                name: '',
                address: '',
                zipCode: '',
                loading: false,
                data: {},
                gqlError: {}
            }
        },
        created() {
            if (this.client) {
                this.name = this.client.name;
                this.address = this.client.address;
                this.zipCode = this.client.zipCode;
            }
        },
        methods: {
            done() {
                if (!this.client) {
                    this.name = '';
                    this.address = '';
                    this.zipCode = '';
                    this.$emit('created')
                } else {
                    this.$emit('edited')
                }
            },
            handleSubmit() {
                this.$apollo.mutate({
                    mutation: this.client
                        ? require('../../../graphql/mutations/EditClientMutation.graphql')
                        : require('../../../graphql/mutations/AddClientMutation.graphql'),
                    variables: this.client ? {
                        input: {
                            name: this.name,
                            address: this.address,
                            zip_code: this.zipCode,
                            client: this.client.slug
                        }
                    } : {
                        input: {
                            name: this.name,
                            address: this.address,
                            zip_code: this.zipCode
                        }
                    }
                }).then((loading, data, gqlError) => {
                    this.loading = loading;
                    this.data = data;
                    this.gqlError = gqlError;
                    this.done()
                });
            }
        },

    }
</script>

<style lang="scss" scoped>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;

        .client-form {
            display: flex;
            flex-direction: column;
            padding: 2%;

            & button {
                background: white;
                border: none;
                padding: 20px 30px;
                cursor: pointer;
                margin: 0 auto;
                border-radius: 3px;

                .loader {
                    margin: 0 auto;
                }
            }

            & .form-input {
                width: 100%;
                margin: 16px auto;
                position: relative;

                & input {
                    width: 100%;
                    padding: 10px;
                    border-radius: 3px;
                    border: 1px solid darken(white, 5%);
                    @include breakpoint(desktop) {
                        width: 70%;
                    }
                }
            }

        }
    }

</style>