<template>
    <nav class="main-navbar" role="navigation">
        <div class="container">
            <router-link :to="{name: 'home'}">ClientHub</router-link>
            <ul class="desktop-menu">
                <menu-item :to="{name: 'about'}">A propos</menu-item>
            </ul>
            <div @click.prevent="toggleMenu" class="menu-button">
                <button class="hamburger hamburger--slider" :class="{'is-active': showMenu}" type="button">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
                <transition name="fade-down" mode="in-out">
                    <ul v-on-clickaway="hideMenu" class="mobile-menu" v-if="showMenu">
                        <menu-item class="bright" :to="{name: 'about'}" icon="info">A propos</menu-item>
                    </ul>
                </transition>
            </div>
        </div>
    </nav>
</template>

<script>
    import MenuItem from './menu/MenuItem'
    import { directive as onClickaway } from "vue-clickaway";

    export default {
        name: "app-header",
        directives: {
            onClickaway,
        },
        components: {MenuItem},
        data () {
            return {
                showMenu: false
            }
        },
        methods: {
            toggleMenu() {
                this.showMenu = !this.showMenu;
            },
            hideMenu() {
                this.showMenu = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .main-navbar {
        background-color: white;
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        height: 70px;
        @include navbarShadow();
        & .pull-right {
            margin-left: auto;
        }
        & .container {
            display: flex;
            margin: 0 auto;
            align-items: center;
            height: 100%;
            padding: 0 0 0 1rem;
            @include breakpoint(tablet) {
                max-width: 80%;
            }
        }
    }
    .menu-button {
        position: relative;
        background: whitesmoke;
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        margin-left: auto;
        @include breakpoint(tablet) {
            display: none;
        }
        & button.hamburger {
            padding: 0;
            display: flex;
            & .hamburger-box {
                transform: scale(0.6);
                & .hamburger-inner {
                    background-color: gray;
                    &:before, &:after {
                        background: inherit;
                    }
                }
            }
        }
        &:hover {
            cursor: pointer;
        }
        & svg {
            color: white;
            & .icon-menu.opened {
                & line {
                    opacity: 0;
                }
            }
        }
    }

    .desktop-menu {
        display: none;
        @include breakpoint(tablet) {
            display: flex;
            margin: 0 0 0 auto;
            padding: 0;
            & li {
                margin-right: 1rem;
                &:last-of-type {
                    margin-right: 0;
                }
            }
        }
    }

    .mobile-menu {
        position: absolute;
        display: flex;
        margin: 0;
        text-align: right;
        flex-direction: column;
        border-radius: 0 0 0 6px;
        width: max-content;
        right: 0;
        top: 70px;
        padding: 20px;
        background: whitesmoke;
        & li {
            margin-bottom: 1rem;
            &:last-of-type {
                margin-bottom: 0;
            }
        }
        @include breakpoint(destkop) {
            border-radius: 6px;
        }
    }
</style>
