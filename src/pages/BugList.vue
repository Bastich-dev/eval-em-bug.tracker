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
                    <tr v-for="bug in bugs">
                        <td>
                            <span class="title" v-text="bug.title" />
                            <br />
                            <span class="description" v-text="bug.description" />
                        </td>
                        <td class="date" v-text="bug.date"></td>
                        <td class="author" v-text="bug.author"></td>
                        <td class="state">
                            <select v-model="bug.state" @change="changeState">
                                <option v-for="state in statesValues" v-bind:value="state.value" v-text="state.label"></option>
                            </select>
                        </td>
                        <td class="delete">
                            <div />
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
                initbugs: [
                    {
                        title: "titre",
                        description: "description",
                        date: "date",
                        author: "author",
                        state: "todo",
                    },
                    {
                        title: "titre",
                        description: "description",
                        date: "date",
                        author: "author",
                        state: "todo",
                    },
                ],
                statesValues: [
                    {
                        value: "todo",
                        label: "A traiter",
                    },
                    {
                        value: "done",
                        label: "Traité",
                    },
                    {
                        value: "progress",
                        label: "En cours",
                    },
                ],
                bugs: [],
            };
        },
        methods: {
            changeState: async () => {
                console.log("changeState");
            },
            deleteBug: async () => {
                console.log("changeState");
            },
        },
        created() {
            if (this.$route.fullPath.includes("todo")) {
                this.bugs = this.initbugs.filter(bug => bug.author === this.$route.query.user);
            } else {
                this.bugs = this.initbugs;
            }
        },
        watch: {
            $route(to, from) {
                const selector = document.querySelector("table")?.classList;
                if (this && selector) {
                    selector.remove("fadeInUp");
                    setTimeout(() => {
                        if (to.fullPath.includes("todo")) {
                            this.bugs = this.initbugs.filter(bug => bug.author === to.query.user);
                        } else {
                            this.bugs = this.initbugs;
                        }
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
