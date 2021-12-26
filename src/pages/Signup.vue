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
            <router-link to="/login">Cliquez ici pour vous connecter</router-link>
        </form>
    </div>
</template>

<script>
    import { useToast } from "vue-toastification";
    import { signup } from "../functions/api";
    import "../styles/login.less";

    const toast = useToast();
    export default {
        data() {
            return {
                loading: false,
                username: "",
                password: "",
                password_verif: "",
            };
        },
        methods: {
            // Submit avec touche enter
            submit(e) {
                e.preventDefault();
                this.loading = true;
                if (this.password !== this.password_verif) {
                    toast.error("Les mots de passe ne correspondent pas !");
                    this.password = "";
                    this.password_verif = "";
                    this.loading = false;
                    return;
                } else {
                    signup(this.username, this.password)
                        .then(token => {
                            toast.success("Vous êtes maintenant connecté avec votre nouveau compte");
                            // Login Mémorisation du jeton
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
                }
            },
        },
    };
</script>
