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
                        <td class="date">
                            {{ new Date(bug.timestamp * 1000).toLocaleDateString() }}
                            à
                            {{ new Date(bug.timestamp * 1000).toLocaleTimeString() }}
                        </td>
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
    import Navbar from "../components/layout/Navbar.vue";
    import { getListUsers, getListBugs, getChangeState, getDeleteBug } from "../functions/api";
    import { useToast } from "vue-toastification";

    const toast = useToast();
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
            // Utils
            updateList() {
                if (this.$route.fullPath.includes("todo")) {
                    this.bugs = this.initbugs.filter(bug => bug.user_id === this.user_id);
                } else {
                    this.bugs = this.initbugs;
                }
            },

            // Actions
            changeState(bug_id) {
                const newValue = this.bugs.find(e => e.id === bug_id);
                getChangeState(this, bug_id, newValue).then(() => {
                    toast.success("Status du bug changé !");
                });
                // .catch(() => {});
            },
            deleteBug(bug_id) {
                if (window.confirm("Voulez vous vraiment supprimer ce bug ?")) {
                    getDeleteBug(this, bug_id).then(() => {
                        this.initbugs = this.initbugs.filter(bug => bug.id !== bug_id);
                        this.updateList();
                        toast.success("Bug supprimé");
                    });
                    // .catch(() => {});
                }
            },
        },

        // LifeCycle
        created() {
            getListUsers(this).then(userList => {
                this.users = userList;
                this.user_id = userList.findIndex(user => user === localStorage.getItem("username"));
            });
            getListBugs(this).then(bugs => {
                console.log(bugs);
                this.initbugs = bugs;
                this.updateList();
            });
        },
        watch: {
            $route() {
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
