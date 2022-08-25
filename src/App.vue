<template>
	<div v-if="loading" class="center-spinner">
		<Spinner></Spinner>
	</div>
	<div v-else>
		<sidebar class="sidebar" v-if="isAuth"></sidebar>
		<div id="main" :style="{ 'margin-left': sidebarWith }">
			<!-- 		<div id="navigation-icon">
			<i class="fas fa-bars"></i>
		</div> -->
			<!-- 		<nav>
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</nav> -->
			<router-view v-slot="slotProps">
				<transition name="route" appear mode="out-in">
					<component :is="slotProps.Component"></component>
				</transition>
			</router-view>
		</div>
		<!-- 		<router-view v-slot="slotProps" v-if="!isAuth">
			<transition name="route" appear mode="out-in">
				<component :is="slotProps.Component"></component>
			</transition>
		</router-view> -->
		<!-- <router-view v-if="!isAuth" /> -->
	</div>
	<!-- <p>Resize me! Current width is: {{ windowWidth }}</p> -->
</template>
<script>
import sidebar from "./components/sidebar/Sidebar.vue";
import Spinner from "./components/ui/Spinner.vue";
export default {
	data() {
		return {
			windowWidth: window.innerWidth,
			loading: true,
		};
	},
	components: { sidebar, Spinner },
	computed: {
		sidebarWith() {
			/* console.log(this.$store.getters.Sidebarwiths); */
			return this.$store.getters.Sidebarwiths;
		},
		isAuth() {
			return this.$store.getters["auth/userId"];
		},
	},
	watch: {
		windowWidth(value) {
			if (value < 550) {
				this.$store.commit("setSIDEBAR_WITH_COLLAPSED", 0);
			} else {
				this.$store.commit("setSIDEBAR_WITH_COLLAPSED", 38);
			}
		},
	},
	methods: {
		async trytologin() {
			await this.$store.dispatch("auth/tryLogin");
			this.loading = false;
		},
	},
	mounted() {
		/* this.$store.dispatch("ressources/loadRessources"); */

		window.onresize = () => {
			this.windowWidth = window.innerWidth;
		};
	},
	created() {
		/* this.$store.dispatch("auth/tryLogin"); */
		this.trytologin();
	},
};
</script>
<style>
.wrapper {
	padding-top: 30px;
}
body {
	background-color: #f7f7f7;
	/* display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center; */
	min-height: 100vh;
	margin: 0;
	font-family: "Lato", sans-serif;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
#main {
	transition: 0.4s margin-left ease-in;
}
.center-spinner {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
}
/* animation router */
.route-enter-from {
	opacity: 0;
	transform: translateY(-30px);
}
.route-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
.route-enter-active {
	transition: all 0.3s ease-out;
}
.route-leave-active {
	transition: all 0.3s ease-in;
}

.route-leave-from,
.route-enter-to {
	opacity: 1;
	transform: translateY(0px);
}
/* responsive */
@media (max-width: 600px) {
	.sidebar {
		display: none;
	}
	.container {
		margin: 0 auto;
		width: 90%;
		display: flex;
		justify-content: center;
		align-items: stretch;
		flex-direction: column;
	}
	.inner-container {
		width: 95%;
		display: inline-block;
		align-self: flex-end;
	}
	.delete-btn,
	.edit-btn {
		font-size: 14px;
		width: 15px;
		height: 15px;
		padding: 0 3px 3px 3px;
		line-height: 50%;
		border-radius: 50%;
	}
	.edit-btn {
		left: -16px;
	}
	.inc-exp-container > div {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		align-items: stretch;
	}
	.money.minus,
	.money.plus {
		flex-shrink: 1;
	}
}
</style>
