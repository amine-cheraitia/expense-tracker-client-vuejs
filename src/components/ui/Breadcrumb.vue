<template>
	<div>
		<div class="breadcrumb">
			<router-link to="/" style="text-align: left">Tableau de bord</router-link>
			/ {{ this.pageName }}
		</div>
	</div>
</template>

<script>
export default {
	props: ["pageName"],
};
</script>

<style scoped>
.breadcrumb {
	text-align: left;
	margin-left: 65px;
	color: #2c3e50;
	font-weight: 400;
}
a {
	text-decoration: none;
	color: #6d5eb4;
}
@media (max-width: 550px) {
	.breadcrumb {
		margin-left: 35px;
	}
}
</style>
