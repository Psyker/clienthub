<template>
    <div class="client-form">
        <form action="" method="post" @submit.prevent="onSubmit({name, address, zipCode})">
            <div class="form-input">
                <input type="text" name="name" v-model="name" placeholder="Nom du client">
            </div>
            <div class="form-input">
                <input type="text" name="address" v-model="address" placeholder="Adresse du client">
            </div>
            <div class="form-input">
                <input type="text" name="name" v-model="zipCode" placeholder="Code postal">
            </div>
            <button class="button-primary" type="submit">Sauvegarder</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "client-form",
        props: {
            onSubmit: {type: Function, required: true}
        },
        data() {
            return {
                name: '',
                address: '',
                zipCode: '',
            }
        },
    }
</script>

<style lang="scss" scoped>
    .client-form {
        display: flex;
        flex-direction: column;
    }
</style>