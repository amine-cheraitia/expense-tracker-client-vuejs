import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@fortawesome/fontawesome-free/js/all";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

createApp(App).use(store).use(router).use(VueSweetalert2).mount("#app");
