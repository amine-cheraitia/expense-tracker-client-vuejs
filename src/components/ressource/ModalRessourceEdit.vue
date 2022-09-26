<template>
	<div class="overlay" v-if="openEdit" @click="toggleHiden"></div>
	<transition name="dialog">
		<div class="modal" v-if="openEdit">
			<h3 style="color: #9c88ff">Modifier la ressource {{ id }}</h3>
			<form id="form" @submit.prevent="sendData">
				<div
					class="form-control"
					:class="{ invalid: Errors.nom_ressourceError }"
				>
					<label for="text">Ressource</label>
					<input
						type="text"
						id="text"
						v-model="ressource.nom_ressource"
						placeholder="Saisissez le nom de la ressource..."
					/>
				</div>
				<div class="form-control" :class="{ invalid: Errors.num_compteError }">
					<label for="text">N° de compte</label>
					<input
						type="text"
						id="text"
						v-model="ressource.num_compte"
						placeholder="Saisissez le N° de compte..."
					/>
				</div>

				<div
					class="form-control"
					:class="{ invalid: Errors.type_ressources_idError }"
				>
					<label for="type_mvm">Ressources</label>
					<select v-model="ressource.type_ressources_id">
						<option value="">...</option>
						<option
							v-for="(item, index) in typeRessource"
							:key="index"
							:value="item.id"
						>
							{{ item.description }}
						</option>
					</select>
				</div>

				<div class="form-control" :class="{ invalid: Errors.soldeError }">
					<label for="amount">Montant du solde <br /> </label>
					<input
						type="number"
						id="amount"
						v-model="ressource.solde"
						placeholder="Saisissez le montant..."
					/>
				</div>
				<button class="btn">Enregistrer la ressource</button>
			</form>
		</div>
	</transition>
</template>

<script>
import axios from "axios";

export default {
	props: {
		openEdit: { type: Boolean, required: true },
		editId: { required: true },
	},
	data() {
		return {
			ressource: {
				id: null,
				nom_ressource: null,
				num_compte: null,
				type_ressources_id: null,
				solde: null,
			},
			Errors: {
				nom_ressourceError: false,
				num_compteError: false,
				type_ressources_idError: false,
				soldeError: false,
			},
		};
	},
	emits: ["toggleModal"],
	methods: {
		toggleHiden() {
			this.$emit("toggleModal");
		},

		async loadEditRessource() {
			await this.$store.dispatch("ressources/loadRessources");
			let ressource = this.$store.getters["ressources/ressources"];
			/* this.id= null */
			const id = this.editId;
			const rs = ressource.find((elem) => elem.id === id);
			this.ressource.id = rs.id;
			this.ressource.nom_ressource = rs.nom_ressource;
			this.ressource.num_compte = rs.num_compte;
			this.ressource.type_ressources_id = rs.type_ressources_id;
			this.ressource.solde = rs.solde;
		},

		async sendData() {
			//refactore cette partie et la mettre au niveau du store et catch ici que les erreurs
			this.Errors.nom_ressourceError = false;
			this.Errors.num_compteError = false;
			this.Errors.type_ressources_idError = false;
			this.Errors.soldeError = false;

			try {
				const userID = this.$store.getters["auth/userId"];
				const data = {
					user_id: userID,
					...this.ressource,
				};
				console.log(data);
				const config = {
					headers: {
						Authorization: `Bearer ${this.$store.getters["auth/getToken"]}`,
					},
				};
				await axios.patch(
					"http://127.0.0.1:8000/api/ressource/" + this.ressource.id,
					data,
					config
				);
				console.log("update");
				this.Errors.nom_ressourceError = false;
				this.Errors.num_compteError = false;
				this.Errors.type_ressources_idError = false;
				this.Errors.soldeError = false;

				await this.$store.dispatch("ressources/loadRessources");
				this.ressource.nom_ressource = null;
				this.ressource.num_compte = null;
				this.ressource.type_ressources_id = null;
				this.ressource.solde = null;

				this.toggleHiden();
				this.$swal.fire({
					target: "#custom-target",
					customClass: {
						container: "position-absolute",
					},
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					didOpen: (toast) => {
						toast.addEventListener("mouseenter", this.$swal.stopTimer);
						toast.addEventListener("mouseleave", this.$swal.resumeTimer);
					},
					icon: "success",
					title: "La ressource a bien été mise à jour.",
				});
			} catch (error) {
				const errors = error.response.data.errors;
				console.log(errors);
				errors;

				if (errors.nom_ressource) {
					this.Errors.nom_ressourceError = true;
				}
				if (errors.num_compte) {
					this.Errors.num_compteError = true;
				}
				if (errors.solde) {
					this.Errors.soldeError = true;
				}
				this.$swal.fire({
					target: "#custom-target",
					customClass: {
						container: "position-absolute",
					},
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					didOpen: (toast) => {
						toast.addEventListener("mouseenter", this.$swal.stopTimer);
						toast.addEventListener("mouseleave", this.$swal.resumeTimer);
					},
					icon: "error",
					title: "Une erreur s'est produite lors de l'enregistrement.",
				});

				console.log(error.response.data.errors);
			}
		},

		loadRessource() {
			this.load = true;
			this.$store.dispatch("ressources/loadRessourcesType");
		},
	},
	computed: {
		typeRessource() {
			return this.$store.getters["ressources/typeressources"];
		},
		id() {
			this.loadEditRessource();
			return this.editId;
		},
	},

	mounted() {
		this.loadRessource();
	},
};
</script>

<style scoped>
.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	background: #f1f1f1;
	/* opacity: 1; */
	transform: translate(-50%, -50%);
	padding: 50px;
	width: 450px;
	border-radius: 15px;
	z-index: 3;
	-webkit-box-shadow: 1px 1px 15px 1px #443b6d;
	box-shadow: 1px 1px 15px 1px #9c88ff;
}
.overlay {
	background: #333;
	opacity: 0.5;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100vh;
	width: 100%;
	z-index: 2;
}

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
	width: 350px;
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

label {
	display: inline-block;
	margin: 10px 0;
}

input[type="text"],
input[type="number"],
input[type="date"],
input[type="date"],
option,
select {
	border: 1px solid #dedede;
	border-radius: 2px;
	display: block;
	font-size: 16px;
	padding: 10px;
	width: 100%;
}

.form-control.invalid input {
	border-color: red;
}
.form-control.invalid label {
	color: red;
}

.btn {
	cursor: pointer;
	background-color: #9c88ff;
	box-shadow: var(--box-shadow);
	color: #fff;
	border: 0;
	display: block;
	font-size: 16px;
	margin: 30px 0 20px;
	padding: 10px;
	width: 100%;
}

.dialog-enter-from,
.dialog-leave-to {
	/* 	transform: translateY(40px);
	opacity: 5; */
	transform: translate(-50%, -10%);
	top: 10%;
	opacity: 0;
}
.dialog-enter-active {
	transition: all 0.5s ease-in;
}
.dialog-leave-active {
	transition: all 0.5s ease-out;
}
.dialog-enter-to,
.dialog-leave-from {
	/* 	transform: translateY(0px);
	opacity: 1; */
	opacity: 1;
	transform: translate(-50%, -50%);
	top: 50%;
}
@media (max-width: 550px) {
	.modal {
		width: 380px;
	}
}
</style>
