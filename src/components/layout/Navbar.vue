<template>
    <div id="navbar">
        <div>
            <h1>Bug Tracker</h1>

            <div class="tag">
                <span>8</span>
                <i class="bugs">Bugs</i>
            </div>

            <div class="tag">
                <span>8</span>
                <i class="todo">En cours</i>
            </div>

            <div class="tag">
                <span>8</span>
                <i class="done">Traités</i>
            </div>
        </div>
        <nav>
            <ul>
                <li>
                    <div class="logout"></div>
                </li>
                <li>
                    <router-link
                        :style="[listActive ? { borderBottom: '3px solid #3eaf7c' } : { borderBottom: '3px solid transform' }]"
                        to="/list-bugs"
                        >Liste complète</router-link
                    >
                </li>
                <li>
                    <router-link
                        :style="[editActive ? { borderBottom: '3px solid #3eaf7c' } : { borderBottom: '3px solid transform' }]"
                        to="/edit-bug"
                        >A traiter</router-link
                    >
                </li>
                <li>
                    <button>Ajouter un bug</button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import "../../styles/navbar.less";
export default {
    data() {
        const { fullPath } = useRoute();
        return { editActive: fullPath === "/edit-bug", listActive: fullPath === "/list-bugs" };
    },
    methods: {
        submit() {},
    },
};
</script>
