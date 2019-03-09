<template>
    <main class="container">
        <div class="creation-page">
            <h1>Ajouter un nouveau client</h1>
            <ClientForm v-on:created="onCreate" />
        </div>
    </main>
</template>

<script>
    import ClientForm from "../../components/client/form/ClientForm";
    export default {
        name: "new-client-page",
        components: {ClientForm},
        methods: {
            onCreate() {
                this.$toasted.show('✅ Le client à bien été crée. Vous allez être redirigé vers le dashboard ...', {
                    theme: 'bubble',
                    position: 'bottom-right',
                    duration: 1500,
                    closeOnSwipe: true,
                    className: "clienthub-toast",
                });
                setTimeout(() => {
                    this.$router.push('/dashboard')
                }, 1600)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .creation-page {
        margin-top: $navbar-height;
    }
</style>