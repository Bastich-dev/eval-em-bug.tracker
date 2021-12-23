<template>
    <div id="bugedit">
        <Navbar />
        <div class="container">
            <form class="fadeInUp" @submit="submit">
                <h2>Ajouter un bug</h2>

                <div>
                    <label for="title">Titre</label>
                    <input v-model="title" name="title" />
                </div>

                <div>
                    <label for="description">Description</label>
                    <textarea v-model="description" name="description" rows="6" />
                </div>

                <p v-if="error" v-text="error"></p>

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
    import Navbar from "../components/layout/Navbar.vue";

    export default {
        data() {
            return {
                title: "",
                description: "",
                loading: false,
                error: null,
            };
        },
        methods: {
            submit(e) {
                e.preventDefault();
                this.loading = true;
                $.get(`http://greenvelvet.alwaysdata.net/bugTracker/api/login/${this.title}/${this.description}`)
                    .then(res => {
                        const response = JSON.parse(res).result;
                        console.log(response);

                        if (response.status === "failure") {
                            this.error = response.message;
                            this.loading = false;
                        } else {
                            this.error = null;
                            this.$router.push("/");
                        }
                    })
                    .catch(err => {
                        this.error = "Erreur : " + err.status + ". Veuillez réessayer ulterieurement";
                        this.loading = false;
                    });
            },
        },
        components: {
            Navbar,
        },
    };
</script>
