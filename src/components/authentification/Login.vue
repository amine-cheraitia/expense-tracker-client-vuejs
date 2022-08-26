<template>
	<form action="" method="post" @submit.prevent="sendCridential">
		<div class="card">
			<div class="title">
				<i class="fa-solid fa-chart-column"></i> Expense Tracker
			</div>
			<div class="form-container" :class="{ invalid: Errors.email }">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="form.email" @change="reset" />
			</div>
			<div class="form-container" :class="{ invalid: Errors.password }">
				<label for="">Password</label>
				<input type="password" v-model="form.password" @change="reset" />
			</div>
			<div
				class="form-control invalidTxt"
				style="margin-top: 10px"
				v-if="Errors.email || Errors.password"
			>
				<span>{{ messageError }}</span>
			</div>
			<button class="btn">Se Connecter</button>
		</div>
	</form>
</template>

<script>
export default {
	name: "name",
	props: {},
};
</script>

<style scoped></style>
