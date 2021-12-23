<template>
    <main>
        <router-view></router-view>
    </main>
</template>

<script>
    import { defineComponent } from "vue";

    export default defineComponent({
        methods: {
            log(msg) {
                console.log(msg);
            },
        },
        setup() {
            return {};
        },
    });
</script>
