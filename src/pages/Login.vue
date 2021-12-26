<template>
    <div id="login">
        <form class="fadeInUp" @submit="submit">
            <img src="https://cdn-icons-png.flaticon.com/512/1358/1358904.png" alt="christmas" />
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
            <a href="https://github.com/BastosC/Eval-EM-T1-2021#02-stack-utilisée-1" target="_blank" rel="nofollow noopener" class="why"
                >Pourquoi cette stack technique ?</a
            >
            <input placeholder="Identifiant" v-model="username" required name="username" autocomplete="username-password" />
            <input placeholder="Mot de passe" v-model="password" required name="password" type="password" autocomplete="current-password" />
            <div class="checkbox" @click="toggleRemember"><input type="checkbox" :checked="remember" /> <span>Se souvenir de moi</span></div>
            <button v-if="!loading">Se connecter</button>
            <button v-if="loading" disabled>Chargement</button>
            <p>Vous n'avez pas de compte ?</p>
            <router-link to="/signup">Cliquez ici pour vous inscrire</router-link>
        </form>
    </div>
</template>

<script>
    import { useToast } from "vue-toastification";
    import { login } from "../functions/api";
    import "../styles/login.less";

    const toast = useToast();
    export default {
        data() {
            return {
                loading: false,
                username: "",
                password: "",
                remember: false,
            };
        },
        created() {
            const encodedUser = localStorage.getItem("remember");
            if (encodedUser) {
                const user = JSON.parse(atob(encodedUser));
                this.remember = true;
                this.username = user.username;
                this.password = user.password;
            }
        },
        methods: {
            toggleRemember() {
                this.remember = !this.remember;
            },
            // Submit avec touche enter
            submit(e) {
                e.preventDefault();
                this.loading = true;
                login(this.username, this.password)
                    .then(token => {
                        if (this.remember) {
                            const encodedUser = btoa(JSON.stringify({ username: this.username, password: this.password }));
                            localStorage.setItem("remember", encodedUser);
                        } else {
                            localStorage.removeItem("remember");
                        }
                        toast.success("Vous êtes connecté !");
                        // Login Mémorisation du jeton
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
