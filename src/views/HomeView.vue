<template>
	<div class="home wrapper">
		<!-- 		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" /> -->
		<div class="number-section">
			<div class="number-box">1</div>
			<div class="number-box">2</div>
			<div class="number-box">3</div>
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
}
.chart-section {
	width: 90%;
	height: 350px;
}
</style>
