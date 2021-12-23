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
            <button v-if="!loading">S'inscrire</button>
            <button v-if="loading" disabled>Chargement</button>
            <p>Vous avez déjà créé un compte ?</p>
            <router-link :to="{ path: loginRoute }">Cliquez ici pour vous connecter</router-link>
        </form>
    </div>
</template>

<script>
    import "../styles/login.less";
    import { signup } from "../functions/api";

    export default {
        data() {
            return {
                loginRoute: "/login",
                loading: false,
                username: "",
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
                signup(this, this.username, this.password)
                    .then(token => {
                        localStorage.setItem("token", token);
                        localStorage.setItem("username", this.username);
                        this.$router.push("/");
                    })
                    .catch(() => {
                        this.password = "";
                        this.password_verif = "";
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        },
    };
</script>
