<template>
    <div id="navbar">
        <div>
            <h1 @click="clickOnLogo">Bug Tracker</h1>

            <div class="tag">
                <span v-text="bugs_todo" />
                <i class="bugs">Bugs</i>
            </div>

            <div class="tag">
                <span v-text="bugs_progress" />
                <i class="todo">En cours</i>
            </div>

            <div class="tag">
                <span v-text="bugs_done" />
                <i class="done">Traités</i>
            </div>
        </div>
        <nav>
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
                        >A traiter</router-link
                    >
                </li>
                <li>
                    <button v-if="!saveActive" @click="addNewBug">Ajouter un bug</button>
                    <!-- <button v-if="saveActive" @click="saveNewBug">Sauvegarder</button> -->
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
            return { addActive: null, listActive: null, saveActive: null, bugs_done: [], bugs_progress: [], bugs_todo: [] };
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
            clickOnLogo() {
                this.$router.push({ path: "/" });
            },
            addNewBug() {
                this.$router.push({ path: "/add-bug" });
            },

            saveNewBug: async () => {
                console.log("saveNewBug");
            },
        },
        created() {
            const { fullPath } = useRoute();

            if (this.bugs) {
                this.bugs_done = this.bugs.filter(e => e.state === "2").length;
                this.bugs_progress = this.bugs.filter(e => e.state === "1").length;
                this.bugs_todo = this.bugs.filter(e => e.state === "0").length;
            } else {
                getListBugs(this).then(bugs => {
                    this.bugs_done = bugs.filter(e => e.state === "2").length;
                    this.bugs_progress = bugs.filter(e => e.state === "1").length;
                    this.bugs_todo = bugs.filter(e => e.state === "0").length;
                });
            }

            // if (fullPath.includes("add")) {
            //     this.saveActive = true;
            // } else {
            //     this.saveActive = false;
            // }

            if (fullPath === "/list-bugs") {
                this.addActive = false;
                this.listActive = true;
            } else if (fullPath === "/list-bugs/todo") {
                this.addActive = true;
                this.listActive = false;
            }
        },
        updated() {
            console.log(this.bugs);
            if (this.bugs) {
                this.bugs_done = this.bugs.filter(e => e.state === "2").length;
                this.bugs_progress = this.bugs.filter(e => e.state === "1").length;
                this.bugs_todo = this.bugs.filter(e => e.state === "0").length;
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
