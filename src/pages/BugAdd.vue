<template>
    <div id="bugedit">
        <Navbar />
        <div class="container">
            <form class="fadeInUp" @submit="submit">
                <h2>Ajouter un bug</h2>

                <div>
                    <label for="title">Titre</label>
                    <input required v-model="title" name="title" />
                </div>

                <div>
                    <label for="description">Description</label>
                    <textarea required v-model="description" name="description" rows="6" />
                </div>

                <div>
                    <button v-if="!loading">Sauvegarder le nouveau bug</button>
                    <button v-if="loading" disabled>Chargement ...</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import "../styles/bugedit.less";
    import Navbar from "../components/Navbar.vue";
    import { postAddBug, getListUsers } from "../functions/api";
    import { useToast } from "vue-toastification";

    const toast = useToast();
    export default {
        components: {
            Navbar,
        },
        data() {
            return {
                title: "",
                description: "",
                loading: false,
                user_id: "",
            };
        },
        created() {
            getListUsers().then(userList => {
                this.user_id = userList.findIndex(user => user === localStorage.getItem("username"));
            });
        },
        methods: {
            // Submit avec touche enter quand title focused
            submit(e) {
                e.preventDefault();
                this.loading = true;
                postAddBug(this.user_id, this.title, this.description)
                    .then(() => {
                        toast.success(`Bug "${this.title}" ajouté avec succès`);
                        this.$router.push("/");
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        },
    };
</script>
