<template>
    <div id="signup">
        <form class="fadeInUp" @submit="submit">
            <h1>BugTracker</h1>
            <h2>S'inscrire</h2>

            <input placeholder="Identifiant" v-model="username" required name="username" autocomplete="username-password" />
            <input placeholder="Mot de passe" v-model="password" required name="password" type="password" autocomplete="current-password" />
            <input
                placeholder="Verification mot de passe"
                v-model="password_verif"
                required
                name="password_verif"
                type="password"
                autocomplete="current-password"
            />
            <p class="error" v-if="error">" {{ error }} "</p>
            <button v-if="!loading">S'inscrire</button>
            <button v-if="loading" disabled>Chargement</button>
            <p>Vous avez déjà créé un compte ?</p>
            <router-link :to="{ path: loginRoute }">Cliquez ici pour vous connecter</router-link>
        </form>
    </div>
</template>

<script>
    import "../styles/login.less";
    export default {
        data() {
            return {
                loginRoute: "/login",
                loading: false,
                username: "",
                error: null,
                // nameRules: [v => !!v || "Name is required", v => v.length <= 10 || "Name must be less than 10 characters"],
                password: "",
                password_verif: "",
                // emailRules: [v => !!v || "E-mail is required", v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"],
            };
        },
        methods: {
            submit(e) {
                e.preventDefault();
                this.loading = true;
                $.get(`http://greenvelvet.alwaysdata.net/bugTracker/api/signup/${this.username}/${this.password}`)
                    .then(res => {
                        const response = JSON.parse(res).result;
                        if (response.status === "failure") {
                            this.password = "";
                            this.password_verif = "";
                            this.error = response.message;
                            this.loading = false;
                        } else {
                            this.error = null;
                            localStorage.setItem("token", response.token);
                            localStorage.setItem("username", this.username);
                            this.$router.push("/");
                        }
                    })
                    .catch(err => {
                        this.error = "Erreur : " + err.status + ". Veuillez réessayer ulterieurement";
                        this.loading = false;
                    });
            },
        },
    };
</script>
