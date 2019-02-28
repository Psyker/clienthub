<template>
    <div class="page-login">
        <vue-headful title="ClientHub - Connexion"/>
        <ApolloMutation :mutation="require('../graphql/mutations/LoginUserMutation.graphql')"
                        :variables="{ input: { email, password } }"
                        @done="onSuccessLogin">
            <template slot-scope="{ mutate, loading, gqlError }">
                <form action="" method="post" @submit.prevent="mutate" class="login-form">
                    <header>
                        <h1>Connexion</h1>
                    </header>
                    <main>
                        <div class="form-input input-icon">
                            <icon name="user"/>
                            <input autocomplete="email" name="email" type="text" v-model="email"
                                   placeholder="Adresse email...">
                        </div>
                        <div class="form-input input-icon">
                            <icon name="lock"/>
                            <input autocomplete="password" name="password" type="password" v-model="password"
                                   placeholder="Mot de passe...">
                        </div>

                        <button class="button-primary" :disabled="loading" type="submit">
                            <PulseLoader v-if="loading" color="cornflowerblue"/>
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
    import {EventBus} from "../main"
    import {EVENT_LOGIN} from "../constants"
    import PulseLoader from 'vue-spinner/src/PulseLoader'

    export default {
        name: "page-login",
        components: {PulseLoader},
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
            onSuccessLogin({
               data: {
                   loginUser: {token}
               }
            }) {
                EventBus.$emit(EVENT_LOGIN, {
                    token,
                    referrer: this.referrer
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .page-login {
        margin-top: $navbar-height;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        border-radius: 3px;
        width: 100%;
        margin: 0;
        background: white;
        @include breakpoint(tablet) {
            width: 70%;
            max-width: 700px;
            margin: 40px auto;
        }

        & header {
            background: whitesmoke;
            color: $textColor;
            height: 70px;
            display: flex;
            justify-content: center;
            align-content: center;

            & h1 {
                margin: 0;
                line-height: 70px;
            }

            @include breakpoint(tablet) {
                border-top-left-radius: 2px;
                border-top-right-radius: 2px;
                height: 120px;
                & h1 {
                    line-height: 120px;
                }
            }
        }

        & main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            padding: 20px 0 0 0;

            & button {
                background: white;
                border: none;
                border-top: 1px solid lightgrey;
                padding: 20px;
                cursor: pointer;
                .loader {
                    margin: 0 auto;
                }
            }

            & .form-input {
                width: 70%;
                margin: 16px auto;
                position: relative;

                & input {
                    width: 100%;
                    padding: 10px 10px 10px 60px;
                    border-radius: 2px;
                    border: 1px solid darken(white, 5%);
                }
            }

            & .input-icon {
                & svg {
                    width: 30px;
                    height: 100%;
                    transform: scale3d(0.8, 0.8, 0.8);
                    margin-left: 16px;
                    display: inline-block;
                    position: absolute;
                }
            }
        }
    }
</style>
