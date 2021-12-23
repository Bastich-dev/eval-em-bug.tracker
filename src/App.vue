<template>
    <main>
        <router-view />
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
});
</script>
