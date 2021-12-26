<template>
    <main>
        <!-- Snow -->
        <div class="snowflakes" aria-hidden="true">
            <div class="snowflake">❅</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❄</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❄</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❄</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❄</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❄</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❄</div>
        </div>

        <!-- Filtre pour l'image de fond -->
        <!-- <div class="filter" /> -->

        <!-- View -->
        <router-view></router-view>

        <div class="scrollToTop" @click="scrollToTop">
            <img src="./assets/arrow-up.png" alt="arrow-up" />
        </div>
    </main>
</template>

<script>
    export default {
        methods: {
            scrollToTop() {
                // Jquery Animate
                $(".container").animate({ scrollTop: 0 }, 400, "swing");
            },
        },
    };
</script>
