<template>
	<div class="home wrapper">
		<!-- 		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" /> -->
		<h2>Expense Tracker</h2>
		<div class="number-section">
			<div class="number-box">
				<span class="mark"><i class="fa-solid fa-sack-dollar"></i></span>
				<div>Montant des entrés total :</div>
				<Loader class="loading" v-if="loading"></Loader>
				<span class="money solde" v-else>50 000.00 DA</span>
			</div>
			<div class="number-box">
				<span class="mark"><i class="fa-solid fa-arrow-trend-down"></i></span>
				<div>Montant des sortie total :</div>
				<Loader class="loading" v-if="loading"></Loader>
				<span class="money minus" v-else>-50 000.00 DA</span>
			</div>
			<div class="number-box">
				<span class="mark"><i class="fa-solid fa-arrow-trend-up"></i></span>
				<div>Le solde total :</div>
				<Loader class="loading" v-if="loading"></Loader>
				<span class="money plus" v-else>50 000.00 DA</span>
			</div>
		</div>
		<div class="chart-section">
			<div class="row">
				<div class="chart-box">
					<div class="chart-wrapper">
						<canvas id="recetteChart"></canvas>
					</div>
				</div>
				<div class="chart-box">
					<div class="chart-wrapper">
						<canvas id="depenseChart"></canvas>
					</div>
				</div>
			</div>
			<div class="chart-box wide">
				<div class="chart-wrapper wide">
					<canvas id="annuelChart"></canvas>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from "@/components/HelloWorld.vue"; */
/* import { BarChart } from "@/components/Charts/BarChart.vue"; */
import Chart from "chart.js/auto";
import Loader from "@/components/ui/Loader.vue";
/* import Spinner from "../components/ui/Spinner.vue"; */
export default {
	data() {
		return {
			loading: true,
			montant: [150, 0, 2000, 300, 40040, 0, 0, 0, 50, 10000, 10, 100],
			montant2: [
				30000, 500, 250, 0, 13000, 0, 50500, 0, 0, 45000, 45000, 22000,
			],
		};
	},
	name: "HomeView",
	components: {
		Loader,
	},
	methods: {
		async loadMouvement() {
			try {
				await this.$store.dispatch("mouvements/loadMouvement");
				await this.$store.dispatch("ressources/loadRessources");
			} catch (error) {
				error;
				/* 	this.error = true;
				this.errorText = `Une Erreur s'est produise , code de l'erreur: ${error.response.status}`; */
			}
			/* this.counterFNC(); */

			await this.loadSolde();

			/* 			const solde = await this.$store.getters["ressources/solde"];  option a exploré pour le compteur du solde
			const t = this;
			t;
			this.interval = setInterval(() => {
				if (t.counter < solde) {
					console.log("tes");
					t.counter+=100;
				} else {
					console.log("no");
					clearInterval(t.interval);
				}
			}, 1);
			 */
			this.loading = false;
		},
		async loadSolde() {
			const solde = await this.$store.getters["ressources/solde"];

			this.displaySolde2 =
				new Intl.NumberFormat("fr-FR").format(Number(solde)) + ".00 DA";
		},
	},
	computed: {
		loadEntré() {
			return false;
		},
	},
	mounted() {
		const labels = [
			"Jan.",
			"Fev.",
			"Mars",
			"Avr.",
			"Mai.",
			"Juin",
			"Juil",
			"Août",
			"Sep.",
			"Oct.",
			"Nov.",
			"Déc.",
		];

		const data = {
			labels: labels,
			datasets: [
				{
					label: "Dépenses",
					backgroundColor: "rgb(255, 99, 132)" /* #c0392b*/,
					borderColor: "rgb(255, 99, 132)",
					data: this.montant,
					borderWidth: 5,
					hoverBackgroundColor: "#9c88ff",
					hoverBorderColor: "#c0392b",
					scaleStepWidth: 4,
				},
			],
		};

		const config1 = {
			type: "line",
			responsive: true,
			scaleFontColor: "#FFFFFF",
			legend: {
				display: false,
			},
			data: data,
			options: {
				responsive: true,
				scales: {
					x: {
						grid: {
							display: false,
							borderColor: "#514785",
						},

						ticks: {
							/* font: { weight: 500 }, */
							maxTicksLimit: 12,
							color: "#514785",
							padding: 8,
						},
						min: 0,
					},

					y: {
						ticks: {
							/* font: { weight: 550 }, */
							color: "#514785",
							min: 0,
							padding: 8,
							max: 1000000,
							maxTicksLimit: 7,
							callback: function (value) {
								return value + " DA";
							},
						},
						grid: {
							borderColor: "#514785",
							borderWidth: 1,
							/* color: "black", */
							/* borderDash: [5], */
							/* drawBorder: false, */
							/* tickLength: 3, */
						},
					},
				},
			},
			/* 			color: "red",
			backgroundColor: "red", */
			plugins: [
				{
					beforeDraw: (chart) => {
						const { ctx } = chart;
						ctx.save();
						ctx.globalCompositeOperation = "destination-over";
						ctx.fillStyle = "#fff";
						ctx.fillRect(0, 0, chart.width, chart.height);
						ctx.restore();
					},
				},
			],
		};

		const data2 = {
			labels: labels,
			datasets: [
				{
					label: "Recette",
					backgroundColor: "#fff" /* */,
					borderColor: "#fff",
					/* 					borderColor: "rgb(255, 99, 132)", */
					data: this.montant2,
					borderWidth: 5,
					hoverBackgroundColor: "#514785 ",
					hoverBorderColor: "yellow",
					scaleStepWidth: 4,
				},
			],
		};
		const config2 = {
			type: "line",
			responsive: true,
			scaleFontColor: "#FFFFFF",
			legend: {
				display: false,
			},
			data: data2,
			options: {
				responsive: true,
				scales: {
					x: {
						grid: {
							display: false,
						},

						ticks: {
							font: { weight: 550 },
							maxTicksLimit: 12,
							color: "#fff",
							padding: 8,
						},
						min: 0,
					},

					y: {
						ticks: {
							font: { weight: 550 },
							color: "#fff",
							min: 0,
							padding: 8,
							max: 1000000,
							maxTicksLimit: 7,
							callback: function (value) {
								return value + " DA";
							},
						},
						grid: {
							color: "#fff",
							borderDash: [5],
							drawBorder: false,
							tickLength: 3,
						},
					},
				},
			},
			color: "red",
			backgroundColor: "red",
			plugins: [
				{
					beforeDraw: (chart) => {
						const { ctx } = chart;
						ctx.save();
						ctx.globalCompositeOperation = "destination-over";
						ctx.fillStyle = "#9c88ff";
						ctx.fillRect(0, 0, chart.width, chart.height);
						ctx.restore();
					},
				},
			],
		};

		const data3 = {
			labels: labels,
			datasets: [
				{
					label: "Recette",
					backgroundColor: "#fff" /* */,
					borderColor: "#fff",
					/* 					borderColor: "rgb(255, 99, 132)", */
					data: this.montant,
					borderWidth: 5,
					hoverBackgroundColor: "#514785 ",
					hoverBorderColor: "yellow",
					scaleStepWidth: 4,
				},
			],
		};
		const config3 = {
			type: "line",
			responsive: true,
			scaleFontColor: "#FFFFFF",
			legend: {
				display: false,
			},
			data: data3,
			options: {
				responsive: true,
				scales: {
					x: {
						grid: {
							display: false,
						},

						ticks: {
							font: { weight: 550 },
							maxTicksLimit: 12,
							color: "#fff",
							padding: 8,
						},
						min: 0,
					},

					y: {
						ticks: {
							font: { weight: 550 },
							color: "#fff",
							min: 0,
							padding: 8,
							max: 1000000,
							maxTicksLimit: 7,
							callback: function (value) {
								return value + " DA";
							},
						},
						grid: {
							color: "#fff",
							borderDash: [5],
							drawBorder: false,
							tickLength: 3,
						},
					},
				},
			},
			color: "red",
			backgroundColor: "red",
			plugins: [
				{
					beforeDraw: (chart) => {
						const { ctx } = chart;
						ctx.save();
						ctx.globalCompositeOperation = "destination-over";
						ctx.fillStyle = "#9c88ff";
						ctx.fillRect(0, 0, chart.width, chart.height);
						ctx.restore();
					},
				},
			],
		};
		const myChart = new Chart(document.getElementById("recetteChart"), config1);
		myChart;
		const myChart2 = new Chart(
			document.getElementById("depenseChart"),
			config2
		);
		myChart2;
		const myChart3 = new Chart(document.getElementById("annuelChart"), config3);
		myChart3;
	},
	created() {
		this.loadMouvement();
	},
};
</script>
<style scoped>
.chart-wrapper {
	display: inline-block;
	position: relative;
	width: 550px;
	margin: 10px;
}
.chart-wrapper.wide {
}
#recetteChart,
#depenseChart,
#annuelChart {
	border-radius: 15px;
}
.chart-box.wide {
}
.home {
	/* border: 1px solid red; */
	display: flex;
	/* justify-content: space-evenly; */
	align-items: center;
	/* min-height: 90vh; */
	flex-direction: column;
}
.number-section,
.chart-section {
	/* border-radius: 18px; */
	padding: 15px;
	/* 	border: #9c88ff 0.5px solid;
	box-shadow: 2px 2px 5px #9c88ff;
	background: #fff; */
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
	width: 100%;
	/* height: 500px; */
	display: flex;
	justify-content: space-around;
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
	border: #9c88ff 0.5px solid;
	box-shadow: 2px 2px 5px #9c88ff;
	background: #fff;
	border-radius: 18px;
}

.number-box > div {
	text-align: right;
	width: 100%;
}
.mark {
	/* width: 100%; */
	position: relative;
}
.mark .fa-arrow-trend-up {
	border: #9c88ff 0.5px solid;
	background: #2ecc71; /* 9c88ff */
	color: #fff;
	font-size: 24px;
	padding: 20px;
	position: absolute;
	top: -50px;
	left: -145px;
	border-radius: 18px;
}
.mark .fa-arrow-trend-down {
	border: #c0392b 0.5px solid;
	background: #fff;
	color: #c0392b;
	font-size: 24px;
	padding: 20px;
	position: absolute;
	top: -50px;
	left: -145px;
	border-radius: 18px;
}
.mark .fa-sack-dollar {
	border: 0.5px solid;
	background: #9c88ff;
	color: #fff;
	font-size: 24px;
	padding: 20px;
	position: absolute;
	top: -50px;
	left: -145px;
	border-radius: 18px;
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
