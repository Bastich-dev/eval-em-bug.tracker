<template>
    <div id="navbar">
        <div>
            <h1 @click="clickOnLogo">Bug Tracker</h1>
            <div class="menu" @click="openNav">
                <img src="../../assets/menu.png" alt="menu" />
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
            <div class="close" @click="closeNav"><img src="../../assets/close.png" alt="close" /></div>

            <ul>
                <li>
                    <div class="logout" @click="logout"></div>
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
    import { getListBugs } from "../../functions/api";
    import { useRoute } from "vue-router";
    import "../../styles/navbar.less";

    export default {
        props: ["bugs"],
        data() {
            return { addActive: null, listActive: null, bugs_done: null, bugs_progress: null, bugs_todo: null, navResponsiveActive: false };
        },

        methods: {
            logout() {
                if (window.confirm("Voulez vous vraiment vous déconnecter ?")) {
                    $.get(`http://greenvelvet.alwaysdata.net/bugTracker/api/logout/${localStorage.getItem("token")}`)
                        .then(res => {
                            if (response.status === "failure") {
                            } else {
                                localStorage.setItem("token", response.token);
                                this.$router.push("/");
                            }
                        })
                        .catch(err => {
                            this.error = "Erreur : " + err.status + ". Veuillez réessayer ulterieurement";
                        });
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    this.$router.push("/");
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

            saveNewBug: async () => {
                console.log("saveNewBug");
            },
            checkUnderline(path) {
                if (path === "/list-bugs") {
                    this.addActive = false;
                    this.listActive = true;
                } else if (path === "/list-bugs/todo") {
                    this.addActive = true;
                    this.listActive = false;
                }
            },
        },
        created() {
            const { fullPath } = useRoute();
            this.checkUnderline(fullPath);
        },

        watch: {
            $props: {
                handler() {
                    if (this.bugs) {
                        this.bugs_done = this.bugs.filter(e => e.state === "2").length;
                        this.bugs_progress = this.bugs.filter(e => e.state === "1").length;
                        this.bugs_todo = this.bugs.filter(e => e.state === "0").length;
                    } else {
                        getListBugs(this).then(bugs => {
                            console.log(bugs);
                            this.bugs_done = bugs.filter(e => e.state === "2").length;
                            this.bugs_progress = bugs.filter(e => e.state === "1").length;
                            this.bugs_todo = bugs.filter(e => e.state === "0").length;
                        });
                    }
                },
                deep: true,
                immediate: true,
            },
            $route(to, from) {
                this.checkUnderline(to.fullPath);
            },
        },
    };
</script>
