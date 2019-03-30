<template>
    <b-container>
        <b-row>
            <header class="w-100">
                <div class="header-inner">
                    <div class="header-title">
                        <h1>Clients</h1>
                    </div>
                    <div class="header-toolbar">
                        <div class="toolbar-wrapper">
                            <b-link class="toolbar-item" :to="{name: 'client.new'}">Ajouter un client</b-link>
                        </div>
                    </div>
                </div>
            </header>
            <div class="divider"></div>
        </b-row>
        <b-row>
            <client-table-list/>
        </b-row>
    </b-container>
</template>

<script>
    import ClientTableList from "../../components/client/ClientTableList";
    export default {
        name: "clients-page",
        components: {ClientTableList}
    }
</script>

<style scoped lang="scss">
    header {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        padding: 20px;
        position: relative;
        & .header-inner {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            min-height: 40px;
            & .header-title {
                display: flex;
                flex-basis: 0;
                flex-grow: 1;
                align-items: center;
                overflow: hidden;
            }
            & .header-toolbar {
                display: flex;
                justify-content: flex-end;
                .toolbar-item {
                    color: black;
                    text-decoration: none;
                }
            }
        }
    }
    .divider {
        height: 1px;
        width: 100%;
        background-color: lightgrey;
        margin-top: -40px;
    }
</style>