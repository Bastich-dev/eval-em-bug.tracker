<template>
    <div id="navbar">
        <div>
            <h1>Bug Tracker</h1>

            <div class="tag">
                <span>8</span>
                <i class="bugs">Bugs</i>
            </div>

            <div class="tag">
                <span>8</span>
                <i class="todo">En cours</i>
            </div>

            <div class="tag">
                <span>8</span>
                <i class="done">Traités</i>
            </div>
        </div>
        <nav>
            <ul>
                <li>
                    <div class="logout"></div>
                </li>
                <li>
                    <router-link
                        :style="[listActive ? { borderBottom: '3px solid #3eaf7c' } : { borderBottom: '3px solid transparent' }]"
                        to="/list-bugs"
                        >Liste complète</router-link
                    >
                </li>
                <li>
                    <router-link
                        :style="[addActive ? { borderBottom: '3px solid #3eaf7c' } : { borderBottom: '3px solid transparent' }]"
                        to="/list-bugs/todo"
                        >A traiter</router-link
                    >
                </li>
                <li>
                    <button @click="addNewBug">Ajouter un bug</button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import { useRoute } from "vue-router";
    import "../../styles/navbar.less";

    export default {
        data() {
            return { addActive: null, listActive: null };
        },

        methods: {
            addNewBug() {
                this.$router.push({ path: "/add-bug" });
            },
        },
        created() {
            const { fullPath } = useRoute();
            if (fullPath === "/list-bugs") {
                this.addActive = false;
                this.listActive = true;
            } else if (fullPath === "/list-bugs/todo") {
                this.addActive = true;
                this.listActive = false;
            }
        },
        watch: {
            $route(to, from) {
                if (to.fullPath === "/list-bugs") {
                    this.addActive = false;
                    this.listActive = true;
                } else if (to.fullPath === "/list-bugs/todo") {
                    this.addActive = true;
                    this.listActive = false;
                }
            },
        },
    };
</script>
