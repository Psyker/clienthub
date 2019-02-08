<template>
    <div>
        <vue-headful :title="ClientHub - Connexion"/>
        <ApolloMutation :mutation="require('../graphql/mutations/LoginUserMutation.graphql')"
                        :variables="{ input: { username, password } }"
                        @done="onSuccessLogin">
            <template slot-scope="{ mutate, loading, gqlError }">
                <form action="" method="post" @submit.prevent="mutate" class="login-form">

                </form>
            </template>
        </ApolloMutation>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>
