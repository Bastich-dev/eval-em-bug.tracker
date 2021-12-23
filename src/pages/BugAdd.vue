<template>
    <div id="bugedit">
        <Navbar />

        <div>bugedit</div>
    </div>
</template>

<script>
    import "../styles/bugedit.less";
    import Navbar from "../components/layout/Navbar.vue";

    export default {
        data() {
            return {};
        },
        methods: {
            submit() {},
        },
        components: {
            Navbar,
        },
    };
</script>
