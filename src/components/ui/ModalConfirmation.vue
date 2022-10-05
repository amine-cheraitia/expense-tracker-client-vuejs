<template>
	<div class="overlay" v-if="openConfirmation" @click="toggleModal"></div>
	<transition name="dialog">
		<div class="modal" v-if="openConfirmation">
			<h3 style="color: #9c88ff">Confirmation de la suppression</h3>
			<div>Etes Vous sur de vouloir supprimer cette ressource ?</div>
			<button class="btn" @click="deleteRessource">Confirmer</button>
			<button class="btn" @click="toggleModal">Annuler</button>
		</div>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			error: false,
			errorText: "",
		};
	},
	emits: ["toggleModal"],
	props: {
		openConfirmation: { type: Boolean, required: true },
		idDelete: { required: true },
	},
	methods: {
		toggleModal() {
			this.$emit("toggleModal");
		},
		async deleteRessource() {
			try {
				await this.$store.dispatch("ressources/deleteRessource", this.idDelete);

				this.toggleModal();
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
					title: "Suppression réussite",
				});
			} catch (error) {
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
					title: "Une erreur s'est produite",
				});
				this.toggleModal();
			}
		},
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
	display: inline-block;
	font-size: 16px;
	margin: 30px 10px 20px;
	padding: 10px;
	width: 40%;
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
@media (max-width: 550px) {
	.modal {
		width: 380px;
	}
}

@media (max-width: 450px) {
	.modal {
		width: 320px;
	}
}
</style>
