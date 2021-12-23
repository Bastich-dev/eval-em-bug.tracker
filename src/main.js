import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./styles/_variables.less";
import "./styles/_animations.less";
import "./styles/_common.less";

const app = createApp(App);
app.use(router);
app.mount("#app");
