<template>
    <div id="navbar">
        <div>
            <h1 @click="clickOnLogo">Bug Tracker</h1>

            <div class="menu" @click="openNav">
                <img src="../assets/menu.png" alt="menu" />
            </div>

            <div class="tag username">
                <img src="../assets/user.svg" alt="user" />
                <i v-text="username" />
            </div>
            <div class="tag">
                <span v-if="bugs_todo !== null" v-text="bugs_todo" />
                <span v-if="bugs_todo === null">
                    <div class="spinner-small" />
                </span>
                <i class="bugs">Bugs à traiter</i>
            </div>

            <div class="tag">
                <span v-if="bugs_progress !== null" v-text="bugs_progress" />
                <span v-if="bugs_progress === null">
                    <div class="spinner-small" />
                </span>
                <i class="todo">En cours</i>
            </div>

            <div class="tag">
                <span v-if="bugs_done !== null" v-text="bugs_done" />
                <span v-if="bugs_done === null">
                    <div class="spinner-small" />
                </span>
                <i class="done">Traités</i>
            </div>
        </div>
        <nav v-bind:class="{ openNav: navResponsiveActive }">
            <div class="close" @click="closeNav"><img src="../assets/close.png" alt="close" /></div>

            <ul>
                <li>
                    <div class="logout" @click="tryLogout"></div>
                </li>
                <li>
                    <router-link
                        :style="[listActive ? { borderBottom: '3px solid var(--color-primary)' } : { borderBottom: '3px solid transparent' }]"
                        to="/list-bugs"
                        >Liste complète</router-link
                    >
                </li>
                <li>
                    <router-link
                        :style="[addActive ? { borderBottom: '3px solid var(--color-primary)' } : { borderBottom: '3px solid transparent' }]"
                        to="/list-bugs/todo"
                        >À traiter</router-link
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
    import { getListBugs, logout } from "../functions/api";
    import "../styles/navbar.less";
    import { useToast } from "vue-toastification";

    const toast = useToast();
    export default {
        props: ["propsBugs"],
        data() {
            return {
                addActive: null,
                listActive: null,
                bugs_done: null,
                bugs_progress: null,
                bugs_todo: null,
                navResponsiveActive: false,
                username: localStorage.getItem("username"),
            };
        }, // A la création du composant
        created() {
            const { fullPath } = useRoute();
            this.checkUnderline(fullPath);
        },
        watch: {
            // A chaque changement de props "bugs"
            $props: {
                handler() {
                    if (this.propsBugs) this.setBugsCount(this.propsBugs);
                    else {
                        getListBugs().then(bugs => {
                            this.setBugsCount(bugs);
                        });
                    }
                },
                deep: true,
                immediate: true,
            },

            // A chaque changement de route
            $route(to) {
                this.checkUnderline(to.fullPath);
            },
        },
        methods: {
            tryLogout() {
                if (window.confirm("Voulez vous vraiment vous déconnecter ?")) {
                    logout().then(() => {
                        toast.success("Vous êtes déconnecté !");
                        // Login Suppression du jeton
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                        this.$router.push("/");
                    });
                }
            },

            closeNav() {
                this.navResponsiveActive = false;
            },
            openNav() {
                this.navResponsiveActive = true;
            },
            clickOnLogo() {
                this.$router.push({ path: "/" });
            },
            addNewBug() {
                this.navResponsiveActive = false;
                this.$router.push({ path: "/add-bug" });
            },

            // Underline des liens de la navbar
            checkUnderline(path) {
                if (path === "/list-bugs") {
                    this.addActive = false;
                    this.listActive = true;
                } else if (path === "/list-bugs/todo") {
                    this.addActive = true;
                    this.listActive = false;
                }
            },

            // Affecter les valeurs des compteurs
            setBugsCount(bugList) {
                this.bugs_done = bugList.filter(e => e.state === "2").length;
                this.bugs_progress = bugList.filter(e => e.state === "1").length;
                this.bugs_todo = bugList.filter(e => e.state === "0").length;
            },
        },
    };
</script>
