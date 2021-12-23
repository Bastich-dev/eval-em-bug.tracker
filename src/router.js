import { createRouter, createWebHashHistory } from "vue-router";
import BugList from "./pages/BugList.vue";
import BugEdit from "./pages/BugEdit.vue";
import Signup from "./pages/Signup.vue";
import Login from "./pages/Login.vue";

// Routes
const routes = [
    {
        path: "/list-bugs",
        name: "Liste des bugs",
        component: BugList,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/edit-bug/",
        name: "Editer un bugs",
        component: BugEdit,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/signup",
        name: "S'inscrire'",
        component: Signup,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/login",
        name: "login'",
        title: "Se connecter'",
        component: Login,
        meta: {
            requiresAuth: false,
        },
    },
];

// Initializer le router
const history = createWebHashHistory();
const router = createRouter({
    history,
    routes,
});

// Vérifier l'authentification & Redirections
router.beforeEach((to, from, next) => {
    // if (localStorage.getItem("token")) {
    //     if (to.path.includes("/edit-bug") || to.path.includes("/list-bugs")) {
    //         next();
    //     } else {
    //         next({ path: "/edit-bug", replace: true });
    //     }
    // } else {
    //     if (to.path.includes("/login") || to.path.includes("/signup")) {
    //         next();
    //     } else {
    //         next({ path: "/login", replace: true });
    //     }
    // }

    next();
});

export default router;
