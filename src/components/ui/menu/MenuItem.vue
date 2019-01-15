<template>
    <li>
        <router-link v-if="to" :to="to" class="menu-item">
            <icon v-if="icon" :name="icon"/>
            <slot></slot>
        </router-link>
        <a v-else href="#">
            <icon v-if="icon" :name="icon"/>
            <slot></slot>
        </a>
    </li>
</template>

<script>
    export default {
        name: "menu-item",
        props: {
            to: { required: false, default: null },
            icon: { required: false, default: null }
        }
    }
</script>

<style lang="scss" scoped>
    li {
        list-style: none;
        & a {
            display: inline-flex;
            svg.icon {
                display: inline;
                width: 20px;
                height: 20px;
                margin-right: .3rem;
            }
        }
    }
</style>