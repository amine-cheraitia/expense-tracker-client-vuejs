<template>
	<div class="container">
		<div class="card">
			<div class="title">
				<i class="fa-solid fa-chart-column"></i> Expense Tracker
			</div>
			<div class="form-container">
				<label for="email">Email</label>
				<input type="text" id="email" v-model="email" />
			</div>
			<div class="form-container">
				<label for="">Password</label>
				<input type="password" v-model="password" />
			</div>
			<button class="btn">Se Connecter</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				email: null,
				password: null,
			},
		};
	},
	props: {},
};
</script>

<style scoped>
.container {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

.title {
	margin-bottom: 30px;
	font-size: 28px;
	color: #9c88ff;
	font-weight: 900;
}

#main {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
.card {
	width: 350px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 15px;
	border-radius: 20px;
	border: #9c88ff 1px solid;
	box-shadow: 10px 5px 25px #9c88ff;
}

.form-container label {
	color: #9c88ff;
	font-weight: 700;
}

input[type="text"],
input[type="password"] {
	border: 1px solid #dedede;
	border-radius: 2px;
	display: block;
	font-size: 16px;
	padding: 10px;
	width: 100%;
	outline-color: #9c88ff;
	margin-top: 10px;
	border-radius: 15px;
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
	border-radius: 5px;
}

.form-container {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	width: 80%;

	margin-bottom: 20px;
}
</style>
