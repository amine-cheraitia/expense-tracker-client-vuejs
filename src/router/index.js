import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dashboard from "../views/DashboardView.vue";
import Ressources from "../views/RessourcesView.vue";
import Analytics from "../views/AnalyticsView.vue";
import Login from "../views/LoginView.vue";

const routes = [
	{
		path: "/",
		name: "/",
		component: HomeView,
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: Dashboard,
	},
	{
		path: "/ressources",
		name: "ressources",
		component: Ressources,
	},
	{
		path: "/analytics",
		name: "Analytics",
		component: Analytics,
	},
	{
		path: "/Login",
		name: "Login",
		component: Login,
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: Dashboard,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
