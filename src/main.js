import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import "./styles/_variables.less";
import "./styles/_animations.less";
import "./styles/_common.less";

const app = createApp(App);
const options = {
    position: "bottom-right",
};
app.use(Toast, options);
app.use(router);

app.mount("#app");
