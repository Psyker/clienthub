<template>
    <main class="container">
        <div class="creation-page">
            <h1>Ajouter un nouveau client</h1>
            <ClientForm :onSubmit="handleSubmit" />
        </div>
    </main>
</template>

<script>
    import ClientForm from "../../components/client/form/ClientForm";
    export default {
        name: "new-client-page",
        components: {ClientForm},
        methods: {
            handleSubmit(args) {
                console.log(args)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .creation-page {
        margin-top: $navbar-height;
    }
</style>