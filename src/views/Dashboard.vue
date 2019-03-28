<template>
    <b-container class="mt-5">
        <vue-headful title="ClientHub - Dashboard"></vue-headful>
        <b-row class="horizontaly-centered">
            <b-card-group deck>
                <b-card
                        title="Nombre de clients"
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                >
                    <b-card-text>
                        <b>10</b>
                    </b-card-text>
                </b-card>
                <b-card
                        title="Nombre d'interventions"
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                >
                    <b-card-text>
                        <b>30</b>
                    </b-card-text>
                </b-card>
            </b-card-group>

        </b-row>
    </b-container>
</template>

<script>
    import VueHeadful from "vue-headful";
    export default {
        name: 'dashboard',
        components: {
            VueHeadful,
        },
    }
</script>

<style lang="scss" scoped>
    .horizontaly-centered {
        justify-content: center;
    }
</style>


