<template>
	<div class="home wrapper">
		<!-- 		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" /> -->
		<div class="number-section">
			<div class="number-box">
				<div>Montant des entrés total :</div>
				<span class="money solde">50 000.00 DA</span>
			</div>
			<div class="number-box">
				<div>Montant des sortie total :</div>
				<span class="money minus">-50 000.00 DA</span>
			</div>
			<div class="number-box">
				<div>Le solde total :</div>
				<span class="money plus">50 000.00 DA</span>
			</div>
		</div>
		<div class="chart-section">
			<div class="chart-box">chart1</div>
			<div class="chart-box">chart2</div>
			<div class="chart-box">chart3</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from "@/components/HelloWorld.vue"; */
/* import { BarChart } from "@/components/Charts/BarChart.vue"; */

export default {
	name: "HomeView",
	/* 	components: {
		HelloWorld,
	}, */
};
</script>
<style scoped>
.home {
	/* border: 1px solid red; */
	display: flex;
	/* justify-content: space-evenly; */
	align-items: center;
	min-height: 90vh;
	flex-direction: column;
}
.number-section,
.chart-section {
	border-radius: 18px;
	padding: 15px;
	border: #9c88ff 0.5px solid;
	box-shadow: 2px 2px 5px #9c88ff;
}
.number-section {
	width: 90%;
	height: 150px;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
}
.chart-section {
	width: 90%;
	height: 350px;
}
.number-box {
	padding: 15px;
	border: #9c88ff 0.5px solid;
	width: 280px;
	height: 70px;
	flex: 0 0 280px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
.money.solde {
	font-weight: 700;
}
</style>
