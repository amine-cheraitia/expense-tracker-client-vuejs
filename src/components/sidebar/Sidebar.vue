<template>
	<div class="sidebar" :style="{ width: sidebarWith }">
		<h2 style="margin-bottom: 60px">
			<transition name="swap" mode="out-in">
				<span v-if="collapsed">
					ET <br />
					<i class="fa-solid fa-chart-column"></i>
				</span>
				<span v-else>Expense Tracker </span>
			</transition>
		</h2>
		<sidebarlink to="/" icon="fas fa-home"> home </sidebarlink>
		<sidebarlink to="dashboard" icon="fas fa-columns"> Dashboard </sidebarlink>

		<sidebarlink to="ressources" icon="fas fa-users"> Ressources </sidebarlink>
		<sidebarlink to="Analytics" icon="fas fa-chart-bar">
			Analytics
		</sidebarlink>
		<sidebar-link to="logout" icon="fa fa-sign-out">
			Se deconnecter
		</sidebar-link>

		<!-- <sidebarlink to="images" icon="fas fa-image"> Images </sidebarlink> -->
		<span
			class="collapse-icon"
			:class="{ 'rotate-180': collapsed }"
			@click="toggleSidebar"
		>
			<i class="fa fa-angle-double-left" aria-hidden="true"></i>
		</span>
	</div>
</template>

<script>
import sidebarlink from "./SidebarLink.vue";
import SidebarLink from "./SidebarLink.vue";
export default {
	name: "name",
	data() {
		return {
			windowWidth: 0,
		};
	},
	components: { sidebarlink, SidebarLink },
	emits: ["setClose"],
	methods: {
		toggleSidebar() {
			this.$emit("setClose", false);
			this.$store.dispatch("toggleSidebar");
		},
		handleResize() {
			this.windowWidth = window.innerWidth;
		},
	},
	computed: {
		sidebarWith() {
			/* console.log(this.$store.getters.Sidebarwiths); */

			return this.$store.getters.Sidebarwiths;
		},
		collapsed() {
			/* console.log(this.$store.getters.collapsed); */
			return this.$store.getters.collapsed;
		},
		respo() {
			if (this.windowWidth > 650) {
				console.log("flex--------------------------------");
				return "flex";
			} else {
				console.log("none--------------------------------");
				return "none";
			}
		},
	},
	watch: {
		windowWidth(value) {
			console.log(value);
			/* 			if (value < 550) {
				this.respo = "flex";
				 this.responsive = "none"; 
			} else {
				this.respo = "none";
			} */
		},
	},
	mounted() {
		/* 		window.onresize = () => {
			this.windowWidth = window.innerWidth;
		}; */
		window.addEventListener("resize", this.handleResize);
		this.handleResize();
	},
};
</script>
<style>
:root {
	--sidebar-bg-color: #6d5eb4;
	--sidebar-item-hover: #9c88ff;
	--sidebar-item-active: #514785;
}
</style>
<style scoped>
.sidebar {
	color: white;
	background-color: var(--sidebar-bg-color);
	float: left;
	position: fixed;
	margin: 1rem;
	border-radius: 15px;
	z-index: 1;
	top: 0;
	left: 0;
	bottom: 0;
	padding: 0.7em;
	transition: 0.7s ease-in-out;
	transition: all 0.3s ease !important;
	display: flex;
	flex-direction: column;
}

.collapse-icon {
	position: fixed;
	bottom: 18px;
	padding: 0.75em;
	color: rgba(255, 255, 255, 0.7);

	transition: 0.2s linear;
}

.rotate-180 {
	transform: rotate(180deg);
	transition: 0.2s linear;
}

.swap-enter-active,
.swap-leave-active {
	transition: opacity 0.3s;
	transform: translateY(0px);
}

.swap-enter-from,
.swap-leave-to {
	opacity: 0;
}
.sidebar-active {
	transition: 0.7s ease-in-out;
	/* 	display: none;
	transition: 0.7s ease-in-out; */
}

/*  */
@media (max-width: 640px) {
	.sidebar {
		/* display: v-bind(respo); */
		display: none;
	}

	.sidebar-active {
		display: flex;

		padding: 0;
		margin: 0;
		border-radius: 0;
	}
}
</style>
