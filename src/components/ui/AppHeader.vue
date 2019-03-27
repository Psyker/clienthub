<template>
    <b-navbar toggleable="lg" type="light" variant="light" tag="nav">
        <b-navbar-brand :to="{name: 'home'}">ClientHub</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item v-if="isLoggedIn && viewer" :to="{name: 'user.dashboard'}">Dashboard</b-nav-item>
                <b-nav-item v-if="isLoggedIn && viewer" :to="{name: 'clients.view'}">Clients</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
               <!-- <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>-->
                <b-nav-item-dropdown v-if="isLoggedIn && viewer" right>
                    <template slot="button-content"><em>{{ `${viewer.firstname} ${viewer.lastname}` }}&nbsp;</em></template>
                    <b-dropdown-item href="#"><icon name="user"/>Profil</b-dropdown-item>
                    <b-dropdown-item @click.prevent="logout"><icon name="power"/>Se déconnecter</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item v-else :to="{name: 'login'}">Connexion</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { SET_VIEWER } from "../../store/modules/user/actions";
    import { EventBus } from '../../main'
    import { EVENT_LOGOUT } from "../../constants";

    export default {
        name: "app-header",
        computed: {
            ...mapState('user', ['isLoggedIn'])
        },
        apollo: {
            viewer: {
                query: require("../../graphql/queries/user/ViewerQuery.graphql"),
                result({data: { viewer } }) {
                    this[SET_VIEWER](viewer)
                }
            }
        },
        methods: {
            ...mapActions("user", [SET_VIEWER]),
            logout() {
                EventBus.$emit(EVENT_LOGOUT);
            }
        }
    }
</script>

<style scoped lang="scss">
    .navbar {
        padding: 0.5rem 5rem;
        svg.icon {
            display: inline;
            width: 20px;
            height: 20px;
            margin-right: .3rem;
        }
    }
</style>
