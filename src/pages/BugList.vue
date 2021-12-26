<template>
    <div id="buglist">
        <Navbar :propsBugs="bugs" />
        <div class="container">
            <table class="fadeInUp">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Désignation</th>
                        <th>Date</th>
                        <th>Nom</th>
                        <th>État</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="bugs === null">
                        <td colspan="6" style="text-align: center">
                            <div class="spinner" />
                        </td>
                    </tr>
                    <tr v-if="bugs?.length === 0">
                        <td style="text-align: center" colspan="6">Aucun bug n'a été trouvé</td>
                    </tr>
                    <tr v-for="bug in bugs">
                        <td>
                            <span> #{{ bug.id }} </span>
                        </td>
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
    import Navbar from "../components/Navbar.vue";
    import { getListUsers, getListBugs, getChangeState, getDeleteBug } from "../functions/api";
    import { useToast } from "vue-toastification";

    const toast = useToast();
    export default {
        components: {
            Navbar,
        },
        data() {
            return {
                initbugs: [],
                statesValues: [
                    {
                        value: "0",
                        label: "À traiter",
                    },
                    {
                        value: "1",
                        label: "En cours",
                    },
                    {
                        value: "2",
                        label: "Traité",
                    },
                ],
                bugs: null,
                users: [],
                user_id: null,
            };
        },
        watch: {
            $route() {
                //  jQuery
                const selector = $("table");
                if (this && selector) {
                    selector.removeClass("fadeInUp");
                    setTimeout(() => {
                        this.updateList();
                        selector.addClass("fadeInUp");
                    }, 100);
                }
            },
        },
        // LifeCycle
        created() {
            this.resfreshlistBugs();
            $(".scrollToTop").hide();

            // Rafraichement régulier de la liste des bugs toutes les 30 secondes
            setInterval(() => {
                this.resfreshlistBugs();
            }, 30000);
        },
        mounted() {
            this.onScroll();
        },
        methods: {
            // Events
            onScroll() {
                // Evenements jQuery
                $(".container").on("scroll", function (e) {
                    const actual_height = $(this).get(0).scrollTop;
                    if (actual_height > 50) {
                        $(".scrollToTop").fadeIn();
                    } else {
                        $(".scrollToTop").fadeOut();
                    }
                });
            },

            // Utils
            updateList() {
                if (this.$route.fullPath.includes("todo")) {
                    this.bugs = this.initbugs.filter(bug => +bug.user_id === this.user_id);
                } else {
                    this.bugs = this.initbugs;
                }
            },
            resfreshlistBugs() {
                getListUsers().then(userList => {
                    this.users = userList;
                    this.user_id = userList.findIndex(user => user === localStorage.getItem("username"));
                    getListBugs().then(bugs => {
                        this.initbugs = bugs;
                        this.updateList();
                    });
                });
            },

            // Actions
            changeState(bug_id) {
                const index = this.bugs.findIndex(e => e.id === bug_id);
                getChangeState(bug_id, this.bugs[index]).then(() => {
                    this.bugs[index].timestamp = new Date().getTime() / 1000;
                    toast.success(`État du bug #${bug_id} changé !`);

                    // Traversing jQuery DOM
                    $(`tr`)
                        .eq(index + 1)
                        .addClass("glowCell");
                    setTimeout(() => {
                        // Traversing jQuery DOM
                        $(`tr`)
                            .eq(index + 1)
                            .removeClass("glowCell");
                    }, 1000);
                });
            },
            deleteBug(bug_id) {
                if (window.confirm("Voulez vous vraiment supprimer ce bug ?")) {
                    getDeleteBug(bug_id).then(() => {
                        this.initbugs = this.initbugs.filter(bug => bug.id !== bug_id);
                        this.updateList();
                        toast.success(`Bug #${bug_id} supprimé !`);
                    });
                }
            },
        },
    };
</script>
