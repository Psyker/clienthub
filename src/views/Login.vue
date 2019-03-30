<template>
    <div class="page-login">
        <vue-headful title="ClientHub - Connexion"/>
        <ApolloMutation :mutation="require('../graphql/mutations/user/LoginUserMutation.graphql')"
                        :variables="{ input: { email, password } }"
                        @done="onSuccessLogin">
            <template slot-scope="{ mutate, loading, gqlError }">
                <b-container align-items="center" class="mt-5">
                    <h1>Connexion</h1>
                    <b-form @submit.prevent="mutate" class="w-100" align-self="center">
                        <b-form-group
                                id="input-group-email"
                                label="Adresse email:"
                                label-for="email-input"
                                required
                                description="Nous ne partagerons jamais votre email à qui que ce soit."
                        >
                            <b-form-input
                                    id="email-input"
                                    type="email"
                                    v-model="email"
                                    required
                                    placeholder="Entrez votre adresse email"
                            />
                        </b-form-group>
                        <b-form-group id="input-group-password" label="Mot de passe:" label-for="password-input">
                            <b-form-input
                                    id="password-input"
                                    type="password"
                                    v-model="password"
                                    required
                                    placeholder="Entrez votre mot de passe"
                            />
                        </b-form-group>
                        <b-button type="submit" variant="primary" :disabled="loading">
                            <b-spinner v-if="loading" variant="light" label="Spinning" />
                            <span v-else>Se connecter</span>
                        </b-button>
                    </b-form>
                    <div v-if="gqlError">Une erreur s'est produite, veuillez réessayez pus tard.</div>
                </b-container>
            </template>
        </ApolloMutation>
    </div>
</template>

<script>
    import {EventBus} from "../main"
    import {EVENT_LOGIN} from "../constants"

    export default {
        name: "login-page",
        data() {
            return {
                email: "",
                password: "",
                referrer: null
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.referrer = from
            })
        },
        methods: {
            onSuccessLogin({data: {loginUser: {token}}}) {
                EventBus.$emit(EVENT_LOGIN, {
                    token,
                    referrer: this.referrer
                });
            }
        },
    }
</script>

<style scoped lang="scss">
    form {
        padding: 20px;
        background: white;
    }
</style>
