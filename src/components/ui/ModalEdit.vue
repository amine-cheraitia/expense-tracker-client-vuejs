<template>
	<div class="overlay" v-if="openEdit" @click="toggleHiden"></div>
	<transition name="dialog">
		<div class="modal" v-if="openEdit">
			<h3 style="color: #9c88ff">Modification du mouvement N°: {{ id }}</h3>
			<form id="form" @submit.prevent="sendData">
				<div class="form-control" :class="{ invalid: Errors.descriptionError }">
					<label for="text">Description</label>
					<input
						type="text"
						id="text"
						v-model="mouvement.description"
						placeholder="Saisissez la description..."
					/>
				</div>
				<div
					class="form-control"
					:class="{ invalid: Errors.ressource_idError }"
				>
					<label for="type_mvm">Ressources</label>
					<select v-model="mouvement.ressource_id">
						<option value="">...</option>
						<option
							v-for="(item, index) in ressources"
							:key="index"
							:value="item.id"
						>
							{{ displayRessource(item.nom_ressource, item.num_compte) }}
						</option>
					</select>
				</div>
				<div
					class="form-control"
					:class="{ invalid: Errors.date_mouvementError }"
				>
					<label for="type_mvm">Date du mouvement</label>
					<input type="date" v-model="mouvement.date_mouvement" />
				</div>
				<div
					class="form-control"
					:class="{ invalid: Errors.type_mouvement_idError }"
				>
					<label for="" style="margin-right: 10px">Type de mouvement</label>
					<input
						v-model="mouvement.type_mouvement_id"
						type="radio"
						name="es"
						value="1"
					/>
					Entré
					<input
						v-model="mouvement.type_mouvement_id"
						type="radio"
						name="es"
						value="2"
					/>
					Sortie
				</div>
				<div class="form-control" :class="{ invalid: Errors.montantError }">
					<label for="amount">Montant <br /> </label>
					<input
						type="number"
						id="amount"
						v-model="mouvement.montant"
						placeholder="Saisissez le montant..."
					/>
				</div>
				<button class="btn">Enregistrer la transaction</button>
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
			mouvement: {
				id: null,
				description: null,
				ressource_id: null,
				date_mouvement: null,
				montant: null,
				type_mouvement_id: null,
			},
			Errors: {
				descriptionError: false,
				ressource_idError: false,
				date_mouvementError: false,
				montantError: false,
				type_mouvement_idError: false,
			},
		};
	},
	emits: ["toggleModal"],
	methods: {
		async loadEditMouvement() {
			await axios
				.get("http://127.0.0.1:8000/api/mouvement/" + this.editId)
				.then((res) => {
					console.log(res.data);
					this.mouvement.description = res.data.description;
					this.mouvement.id = res.data.id;
					this.mouvement.ressource_id = res.data.ressource_id;
					this.mouvement.date_mouvement = res.data.date_mouvement;
					this.mouvement.montant = res.data.montant;
					this.mouvement.type_mouvement_id = res.data.type_mouvement_id;
				})
				.catch((err) => {
					err;
				});
		},
		toggleHiden() {
			this.$emit("toggleModal");
		},
		displayRessource(ressourcesName, ressorucesNbr) {
			if (ressorucesNbr) {
				return ressourcesName + " -  N° " + ressorucesNbr;
			} else {
				return ressourcesName;
			}
		},
		async sendData() {
			//refactore cette partie et la mettre au niveau du store et catch ici que les erreurs
			this.Errors.descriptionError = false;
			this.Errors.ressource_idError = false;
			this.Errors.date_mouvementError = false;
			this.Errors.montantError = false;
			this.Errors.type_mouvement_idError = false;
			try {
				const userID = this.$store.getters["auth/userId"];
				const data = {
					user_id: userID,

					...this.mouvement,
				};

				await axios.patch(
					"http://127.0.0.1:8000/api/mouvement/" + this.mouvement.id,
					data
				);
				console.log("update");
				this.Errors.descriptionError = false;
				this.Errors.ressource_idError = false;
				this.Errors.date_mouvementError = false;
				this.Errors.montantError = false;
				this.Errors.type_mouvement_idError = false;
				await this.$store.dispatch("mouvements/loadMouvement");
				await this.$store.dispatch("mouvements/loadEntréSortie");
				await this.$store.dispatch(
					"ressources/loadRessources"
				); /* check after */
				this.mouvement.description = null;
				this.mouvement.ressource_id = null;
				this.mouvement.date_mouvement = null;
				this.mouvement.montant = null;
				this.mouvement.type_mouvement_id = null;
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
					title: "Le mouvement a bien été mise a jour.",
				});
			} catch (error) {
				const errors = error.response.data.errors;
				errors;

				if (errors.description) {
					this.Errors.descriptionError = true;
				}
				if (errors.ressource_id) {
					this.Errors.ressource_idError = true;
				}
				if (errors.montant) {
					this.Errors.montantError = true;
				}
				if (errors.date_mouvement) {
					this.Errors.date_mouvementError = true;
				}
				if (errors.type_mouvement_id) {
					this.Errors.type_mouvement_idError = true;
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
			this.$store.dispatch("ressources/loadRessources");
		},
	},
	computed: {
		ressources() {
			return this.$store.getters["ressources/ressources"];
		},
		id() {
			this.loadEditMouvement();

			return this.mouvement.id;
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
</style>
