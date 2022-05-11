<template>
	<h2>Expense Tracker</h2>

	<div class="container">
		<h4>Votre Solde</h4>
		<h1 id="balance">50 000.00 DA</h1>

		<div class="inc-exp-container">
			<div>
				<h4>Ressources</h4>
				<p id="money-plus" class="money plus">+0.00 DA</p>
			</div>
			<div>
				<h4>Dépenses</h4>
				<p id="money-minus" class="money minus">-0.00 DA</p>
			</div>
		</div>

		<h3>Historique</h3>
		<ul id="list" class="list">
			<!-- <li class="minus">
				Cash <span>-$400</span><button class="delete-btn">x</button
				><button class="edit-btn">-</button>
			</li>
			<li class="plus">
				Achat fourniture <span>+$30.000,00</span
				><button class="delete-btn">x</button
				><button class="edit-btn">-</button>
			</li> -->
			<li
				v-for="(mouvement, index) in mouvements"
				:key="index"
				:class="mvmType(mouvement.type_mouvement_id)"
			>
				{{
					mouvement.description.length > 25
						? mouvement.description.slice(0, 22) + "..."
						: mouvement.description
				}}
				<span
					>{{ mouvement.type_mouvement_id == 1 ? "+" : "-" }}
					{{ mouvement.montant }} DA</span
				><button class="delete-btn">x</button
				><button class="edit-btn">-</button>
			</li>
		</ul>
		<button class="btn" @click="hidden = !hidden">Ajouter transaction</button>
		<Modal v-show="hidden" v-on:toggelModal="toggelHiden" />
	</div>
</template>

<script>
import axios from "axios";

import Modal from "../components/ui/Modal.vue";
export default {
	components: { Modal },
	data() {
		return {
			hidden: false,
			mouvementsData: null,
		};
	},
	methods: {
		toggelHiden() {
			this.hidden = !this.hidden;
		},
		mvmType(mvm) {
			if (mvm === 1) {
				return "plus";
			} else {
				return "minus";
			}
		},

		async loadMouvement() {
			let ressource = await axios.get("http://127.0.0.1:8000/api/ressource");
			/* 				.then((e) => {
					console.log(e.data);
				}); */
			this.mouvementsData = ressource.data.data;
			/* console.log(ressource.data); */
		},
	},
	mounted() {
		/* 		const plugin = document.createElement("script");
		plugin.setAttribute("src", "js/ruang-admin.min.js");
		plugin.async = true;
		document.body.appendChild(plugin);

		const plugin2 = document.createElement("script");
		plugin2.setAttribute("src", "vendor/chart.js/Chart.min.js");
		plugin2.async = true;
		document.body.appendChild(plugin2);

		const plugin3 = document.createElement("script");
		plugin3.setAttribute("src", "js/demo/chart-area-demo.js");
		plugin3.async = true;
		document.body.appendChild(plugin3); */
	},
	created() {
		/* this.$store.getters["mouvements/mouvements"]; */
		this.$store.dispatch("mouvements/loadMouvement");
		this.loadMouvement();
		const zz = this.$store.getters["mouvements/mouvements"];
		console.log(zz);
	},
	computed: {
		mouvements() {
			return this.$store.getters["mouvements/mouvements"];
		},
		/* 		async loadMouvementc() {
			let datas = await axios.get("http://127.0.0.1:8000/api/ressource");
			console.log(datas);
			return datas;
		}, */
		description(dsc) {
			return dsc.length;
		},
	},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

:root {
	--box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

* {
	box-sizing: border-box;
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

.container {
	margin: 30px auto;
	width: 450px;
}

h1 {
	letter-spacing: 1px;
	margin: 0;
}

h3 {
	border-bottom: 1px solid #bbb;
	padding-bottom: 10px;
	margin: 40px 0 10px;
}

h4 {
	margin: 0;
	text-transform: uppercase;
}

.inc-exp-container {
	background-color: #fff;
	box-shadow: var(--box-shadow);
	padding: 20px;
	display: flex;
	justify-content: space-between;
	margin: 20px 0;
}

.inc-exp-container > div {
	flex: 1;
	text-align: center;
}

.inc-exp-container > div:first-of-type {
	border-right: 1px solid #dedede;
}

.money {
	font-size: 20px;
	letter-spacing: 1px;
	margin: 5px 0;
}

.money.plus {
	color: #2ecc71;
}

.money.minus {
	color: #c0392b;
}

label {
	display: inline-block;
	margin: 10px 0;
}

input[type="text"],
input[type="number"] {
	border: 1px solid #dedede;
	border-radius: 2px;
	display: block;
	font-size: 16px;
	padding: 10px;
	width: 100%;
}

.btn {
	cursor: pointer;
	background-color: #9c88ff;
	box-shadow: var(--box-shadow);
	color: #fff;
	border: 0;
	display: block;
	font-size: 16px;
	margin: 10px 0 30px;
	padding: 10px;
	width: 100%;
}

.btn:focus,
.delete-btn:focus,
.edit-btn:focus {
	outline: 0;
}

.list {
	list-style-type: none;
	padding: 0;
	margin-bottom: 40px;
}

.list li {
	background-color: #fff;
	box-shadow: var(--box-shadow);
	color: #333;
	display: flex;
	justify-content: space-between;
	position: relative;
	padding: 10px;
	margin: 10px 0;
}

.list li.plus {
	border-right: 5px solid #2ecc71;
}

.list li.minus {
	border-right: 5px solid #c0392b;
}

.delete-btn {
	cursor: pointer;
	background-color: #e74c3c;
	border: 0;
	color: #fff;
	width: 20px;
	height: 20px;
	font-size: 18px;
	line-height: 50%;
	padding: 0px 5px 2px 5px;
	position: absolute;
	top: 50%;
	left: 0;
	transform: translate(-100%, -50%);
	opacity: 0;
	transition: opacity 0.3s ease;
}
.edit-btn {
	cursor: pointer;
	background-color: #9c88ff;
	border: 0;
	color: #fff;
	width: 20px;
	height: 20px;
	font-size: 18px;
	line-height: 50%;
	padding: 0px 5px 2px 5px;
	position: absolute;
	top: 50%;
	left: -22px;
	transform: translate(-100%, -50%);
	opacity: 0;
	transition: opacity 0.3s ease;
}

.list li:hover .delete-btn,
.list li:hover .edit-btn {
	opacity: 1;
}
</style>
