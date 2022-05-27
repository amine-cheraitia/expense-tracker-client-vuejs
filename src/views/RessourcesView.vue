<template>
	<h2>Liste des ressources</h2>
	<div class="main">
		<table class="table">
			<thead>
				<tr>
					<th>Ressource</th>
					<th>N° de compte</th>

					<th>Solde</th>
					<th>actions</th>
				</tr>
			</thead>
			<tbody>
				<!-- 				<tr>
					<td>a</td>
					<td>z</td>

					<td>e</td>
					<td>
						<button class="x">
							<i class="fa-solid fa-x"></i>
						</button>
						&nbsp;
						<button class="minus">
							<i class="fa-solid fa-minus"></i>
						</button>
					</td>
				</tr> -->
				<tr v-for="(ressource, index) in ressources" :key="index">
					<td>{{ ressource.nom_ressource }}</td>
					<td>{{ ressource.num_compte == "" ? "-" : ressource.num_compte }}</td>

					<td>{{ soldeFormat(ressource.solde) }}</td>
					<td>
						<button class="x">
							<i class="fa-solid fa-x"></i>
						</button>
						&nbsp;
						<button class="minus">
							<i class="fa-solid fa-minus"></i>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		<button class="btn" @click="open = !open">Ajouter Ressource</button>
		<ModalRessource
			v-on:toggleModal="toggleHiden"
			:open="open"
		></ModalRessource>
	</div>
</template>

<script>
import ModalRessource from "../components/ressource/ModalRessource.vue";
/* import BaseModal from "../components/ui/BaseModal.vue"; */
export default {
	components: { ModalRessource },
	data() {
		return {
			hidden: false,
			open: false,
		};
	},
	provide() {
		return {
			open: this.open,
		};
	},
	methods: {
		loadRessources() {
			this.$store.dispatch("ressources/loadRessources");
		},
		soldeFormat(solde) {
			return new Intl.NumberFormat("fr-FR").format(Number(solde)) + ".00 DA";
		},
		toggleHiden() {
			this.hidden = false;
			this.open = false;
		},
	},
	computed: {
		ressources() {
			return this.$store.getters["ressources/ressources"];
		},
	},
	created() {
		this.loadRessources();
	},
};
</script>

<style scoped>
/* CSS Snippet For Responsive Table - Stylized */

/* Basic */

* {
	box-sizing: border-box;
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
	width: 180px;
}

.btn:focus,
.delete-btn:focus,
.edit-btn:focus {
	outline: 0;
}

.main {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

table {
	border-spacing: 0px;
	border-collapse: collapse;
	width: 100%;
	max-width: 85%;
	margin-bottom: 15px;
	background-color: transparent; /* Change the background-color of table here */
	text-align: left; /* Change the text-alignment of table here */
}

th {
	font-weight: bold;
	border: 1px solid #cccccc; /* Change the border-color of heading here */
	padding: 8px;
	width: 25%;
}

td {
	border: 1px solid #cccccc; /* Change the border-color of cells here */
	padding: 8px;
}

/* Stylized */

/* Adding Striped Effect for odd rows */

tr {
	background-color: transparent; /* Change the default background-color of rows here */
}

tr:nth-of-type(2n + 1) {
	background-color: #eeeeee; /* Change the background-color of odd rows here */
}

tr th {
	background-color: #6d5eb4; /* Change the background-color of heading here */
}
button {
	color: #6d5eb4;
	border: 0px;
	border-radius: 5px;
	padding: 3px 5px;
}

.x:hover {
	color: #ccc;
	background: #e74c3c;
}

.minus:hover {
	color: #ccc;
	background: #6d5eb4;
}

/* Adding Hover Effect for rows */

tr {
	-moz-transition: background-color 300ms ease-in-out 0s;
	-ms-transition: background-color 300ms ease-in-out 0s;
	-o-transition: background-color 300ms ease-in-out 0s;
	-webkit-transition: background-color 300ms ease-in-out 0s;
	transition: background-color 300ms ease-in-out 0s;
}

tr:hover {
	background-color: #9c88ff; /* Change the hover background-color of rows here */
}

/* Removing left and right border of rows for modern UIs */

tr {
	border-top: 1px solid #cccccc;
	border-bottom: 1px solid #cccccc;
}

th,
td {
	border: none;
	text-align: center;
}
</style>
