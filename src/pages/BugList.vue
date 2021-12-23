<template>
    <div id="buglist">
        <Navbar />
        <div class="container">
            <table class="fadeInUp">
                <thead>
                    <tr>
                        <th>Désignation</th>
                        <th>Date</th>
                        <th>Nom</th>
                        <th>Etat</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="bugs === null">
                        <td colspan="5" style="text-align: center">
                            <div class="spinner" />
                        </td>
                    </tr>
                    <tr v-if="bugs?.length === 0">
                        <td style="text-align: center" colspan="5">Aucun bug n'a été trouvé</td>
                    </tr>
                    <tr v-for="bug in bugs">
                        <td>
                            <span class="title" v-text="bug.title" />
                            <br />
                            <span class="description" v-text="bug.description" />
                        </td>
                        <td class="date" v-text="new Date(bug.timestamp).toLocaleDateString()"></td>
                        <td class="author" v-text="users[bug.user_id]"></td>
                        <td class="state">
                            <select v-model="bug.state" @change="changeState(bug.id)">
                                <option v-for="state in statesValues" v-bind:value="state.value" v-text="state.label"></option>
                            </select>
                        </td>
                        <td class="delete">
                            <div @click="deleteBug(bug.id)" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import "../styles/buglist.less";
    import "vue-multiselect/dist/vue-multiselect.min.css";
    import Navbar from "../components/layout/Navbar.vue";

    export default {
        data() {
            return {
                initbugs: [],
                statesValues: [
                    {
                        value: "0",
                        label: "A traiter",
                    },
                    {
                        value: "1",
                        label: "Traité",
                    },
                    {
                        value: "2",
                        label: "En cours",
                    },
                ],
                bugs: null,
                users: [],
                user_id: null,
            };
        },
        methods: {
            changeState(bug_id) {
                const newValue = this.bugs.find(e => e.id === bug_id);
                $.get(`http://greenvelvet.alwaysdata.net/bugTracker/api/state/${localStorage.getItem("token")}/${bug_id}/${newValue.state}`).then(
                    res => {
                        const response = JSON.parse(res).result;
                        if (response.status === "failure") {
                        } else {
                        }
                    }
                );
            },
            updateList() {
                if (this.$route.fullPath.includes("todo")) {
                    this.bugs = this.initbugs.filter(bug => bug.user_id === this.user_id);
                } else {
                    this.bugs = this.initbugs;
                }
            },
            deleteBug(bug_id) {
                if (window.confirm("Voulez vous vraiment supprimer ce bug ?")) {
                    $.get(`http://greenvelvet.alwaysdata.net/bugTracker/api/delete/${localStorage.getItem("token")}/${bug_id}`).then(res => {
                        const response = JSON.parse(res).result;
                        if (response.status === "failure") {
                        } else {
                            this.initbugs = this.initbugs.filter(bug => bug.id !== bug_id);
                            this.updateList();
                        }
                    });
                }
            },
        },
        created() {
            $.get(`http://greenvelvet.alwaysdata.net/bugTracker/api/users/${localStorage.getItem("token")}`).then(res => {
                const response = JSON.parse(res).result;
                this.users = response.user;
                this.user_id = response.user.findIndex(user => user === localStorage.getItem("username"));
            });

            $.get(`http://greenvelvet.alwaysdata.net/bugTracker/api/list/${localStorage.getItem("token")}/0`).then(res => {
                const response = JSON.parse(res).result;
                console.log(response.bug);
                this.initbugs = response.bug;
                this.updateList();
            });
        },

        watch: {
            $route(to, from) {
                const selector = document.querySelector("table")?.classList;
                if (this && selector) {
                    selector.remove("fadeInUp");
                    setTimeout(() => {
                        this.updateList();

                        selector.add("fadeInUp");
                    }, 100);
                }
            },
        },

        components: {
            Navbar,
        },
    };
</script>
