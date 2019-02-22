<template>
    <div>
        <vue-headful :title="ClientHub - Connexion"/>
        <ApolloMutation :mutation="require('../graphql/mutations/LoginUserMutation.graphql')"
                        :variables="{ input: { username, password } }"
                        @done="onSuccessLogin">
            <template slot-scope="{ mutate, loading, gqlError }">
                <form action="" method="post" @submit.prevent="mutate" class="login-form">
                    <header>
                        <h1>Connexion</h1>
                    </header>
                    <main>
                        <div class="form-input input-icon">
                            <icon name="user"/>
                            <input autocomplete="username" name="username" type="text" v-model="username"
                                   placeholder="Nom d'utilisateur...">
                        </div>
                        <div class="form-input input-icon">
                            <icon name="lock"/>
                            <input autocomplete="password" name="password" type="password" v-model="password"
                                   placeholder="Mot de passe...">
                        </div>

                        <button class="button-primary" :disabled="loading" type="submit">
                            <loader v-if="loading"/>
                            <span v-else>Se connecter</span>
                        </button>
                        <p v-if="gqlError">{{ gqlError }}</p>
                    </main>
                </form>
            </template>
        </ApolloMutation>
    </div>
</template>

<script>
    import { EventBus } from "../main"
    import { EVENT_LOGIN } from "../constants";
    export default {
        name: "page-login",
        data() {
            return {
                username: "",
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
            onSuccessLogin({
                data: {
                    loginUser: { token }
                }
            }) {
                EventBus.$emit(EVENT_LOGIN, {
                    token,
                    referrer: this.referrer
                })
            }
        }
    }
</script>

<style scoped>

</style>
