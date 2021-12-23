<template>
    <div id="login">
        <form class="fadeInUp" @submit="submit">
            <h1>BugTracker</h1>
            <h2>Se connecter</h2>
            <div class="stack">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" alt="" />
                <i>+</i>
                <img src="../assets/vite.svg" alt="" />
                <i>+</i>
                <img src="https://icons-for-free.com/iconfiles/png/512/compilator+css+design+less+style+web+icon-1320165727750056654.png" alt="" />
                <i>+</i>
                <img src="../assets/jquery.png" alt="" />
            </div>
            <input placeholder="Identifiant" v-model="username" required name="username" autocomplete="username-password" />
            <input placeholder="Mot de passe" v-model="password" required name="password" type="password" autocomplete="current-password" />
            <button v-if="!loading">Se connecter</button>
            <button v-if="loading" disabled>Chargement</button>
            <p>Vous n'avez pas de compte ?</p>
            <router-link :to="{ path: signupRoute }">Cliquez ici pour vous inscrire</router-link>
        </form>
    </div>
</template>

<script>
    import "../styles/login.less";
    import { login } from "../functions/api";
    import { useToast } from "vue-toastification";

    const toast = useToast();
    export default {
        data() {
            return {
                signupRoute: "/signup",
                loading: false,
                username: "",
                // nameRules: [v => !!v || "Name is required", v => v.length <= 10 || "Name must be less than 10 characters"],
                password: "",
                // emailRules: [v => !!v || "E-mail is required", v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"],
            };
        },
        methods: {
            submit(e) {
                e.preventDefault();
                this.loading = true;
                login(this, this.username, this.password)
                    .then(token => {
                        toast.success("Vous êtes connecté !");
                        localStorage.setItem("token", token);
                        localStorage.setItem("username", this.username);
                        this.$router.push("/");
                    })
                    .catch(() => {
                        this.password = "";
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        },
    };
</script>
