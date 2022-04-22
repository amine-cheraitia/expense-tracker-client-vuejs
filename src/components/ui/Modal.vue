<template>
	<div class="warpper">
		<div class="overlay" @click="toggelHiden"></div>
		<div class="modal">
			<h3>Add new transaction</h3>
			<form id="form">
				<div class="form-control">
					<label for="text">Text</label>
					<input type="text" id="text" placeholder="Enter text..." />
				</div>
				<div class="form-control">
					<label for="amount"
						>Amount <br />
						(negative - expense, positive - income)</label
					>
					<input type="number" id="amount" placeholder="Enter amount..." />
				</div>
				<button class="btn">Add transaction</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	props: {},
	methods: {
		toggelHiden() {
			this.$emit("toggelModal");
		},
	},
};
</script>

<style scoped>
.warpper {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
}
.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	background: #f1f1f1;
	opacity: 1;
	transform: translate(-50%, -50%);
	padding: 50px;
}
.overlay {
	background: #333;
	opacity: 0.5;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
</style>
