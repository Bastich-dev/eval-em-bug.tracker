import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueToastify from "vue-toastify";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import "./styles/_variables.less";
import "./styles/_animations.less";
import "./styles/_common.less";

const app = createApp(App);

app.use(Toast);
app.use(router);

app.mount("#app");
