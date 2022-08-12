<template>
	<sidebar class="sidebar"></sidebar>
	<div
		style="padding-top: 30px"
		id="main"
		:style="{ 'margin-left': sidebarWith }"
	>
		<!-- 		<div id="navigation-icon">
			<i class="fas fa-bars"></i>
		</div> -->
		<!-- 		<nav>
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</nav> -->
		<router-view />
	</div>
	<!-- <p>Resize me! Current width is: {{ windowWidth }}</p> -->
</template>
<script>
import sidebar from "./components/sidebar/Sidebar.vue";
export default {
	data() {
		return {
			windowWidth: window.innerWidth,
		};
	},
	components: { sidebar },
	computed: {
		sidebarWith() {
			/* console.log(this.$store.getters.Sidebarwiths); */
			return this.$store.getters.Sidebarwiths;
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
	mounted() {
		/* this.$store.dispatch("ressources/loadRessources"); */

		window.onresize = () => {
			this.windowWidth = window.innerWidth;
		};
	},
};
</script>
<style>
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
