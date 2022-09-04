import axios from "axios";

export default {
	namespaced: true,
	state() {
		return {
			mouvements: [
				/* 				{
					id: 1,
					description: "Cash ",
					montant: 500,
					date_mouvement: "2022-03-02",
					type_mouvement_id: 1,
					user_id: 1,
					ressource_id: 1,
				},
				{
					id: 2,
					description: "Achat fourniture",
					montant: 30000,
					date_mouvement: "2022-03-02",
					type_mouvement_id: 2,
					user_id: 1,
					ressource_id: 3,
				}, */
			],
			totalEntré: 0,
			totalSortie: 0,
			monthly_kpi_recette: null,
			monthly_kpi_depense: null,
		};
	},
	mutations: {
		setMouvement(state, payload) {
			state.mouvements = [...payload];
		},
		setEntréSortie(state, payload) {
			state.totalEntré = payload.entré;
			state.totalSortie = payload.sortie;
		},
		set_monthly_kpi(state, payload) {
			state.monthly_kpi_recette = [...payload.recette];
			state.monthly_kpi_depense = [...payload.depense];
			console.log(state.monthly_kpi_recette);
		},
	},
	actions: {
		async loadKpi(context) {
			const userid = context.rootGetters["auth/userId"];
			/* 			const config = {
				headers: {
					Authorization: `Bearer ${context.rootGetters["auth/getToken"]}`,
				},
			}; */
			/* Todo call api and retrive data for monthly and yearly kpi */
			const depense = [];
			const recette = [];
			for (let index = 0; index < 12; index++) {
				depense.push(0);
				recette.push(0);
			}
			console.log(depense);
			await axios(`http://127.0.0.1:8000/api/mouvement/kpi/${userid}`)
				.then((res) => {
					console.log(res.data);
					res.data.forEach((mouvement) => {
						for (let key in mouvement) {
							console.log(`${key}: ${mouvement[key].m}`);
							depense[mouvement[key].m - 1] = parseInt(mouvement[key].depense);
							recette[mouvement[key].m - 1] = parseInt(mouvement[key].recette);
							console.log(recette);
						}
						context.commit("set_monthly_kpi", {
							depense: depense,
							recette: recette,
						});
					});
				})
				.catch((err) => err);
		},
		async loadEntréSortie(context) {
			const userId = context.rootGetters["auth/userId"];
			const config = {
				headers: {
					Authorization: `Bearer ${context.rootGetters["auth/getToken"]}`,
				},
			};
			await axios
				.get("http://127.0.0.1:8000/api/ressourcetotal/user/" + userId, config)
				.then((res) => {
					let payloadEntréSortie = {
						entré: res.data.entré,
						sortie: res.data.sortie,
					};
					context.commit("setEntréSortie", payloadEntréSortie);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		async loadMouvement(context) {
			const config = {
				headers: {
					Authorization: `Bearer ${context.rootGetters["auth/getToken"]}`,
				},
			};
			const userId = context.rootGetters["auth/userId"];
			await axios
				.get("http://127.0.0.1:8000/api/mouvement/user/" + userId, config)
				.then((res) => {
					console.log(userId);
					console.log(res);
					context.commit("setMouvement", res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		async deleteMouvement(context, payload) {
			const config = {
				headers: {
					Authorization: `Bearer ${context.rootGetters["auth/getToken"]}`,
				},
			};
			await axios
				.delete("http://127.0.0.1:8000/api/mouvement/" + payload, config)
				.then((res) => {
					console.log(res);
					context.dispatch("loadMouvement");
					context.dispatch("loadEntréSortie");
				})
				.catch((err) => {
					throw new Error(
						" une erreur s'est produite lors de la suppression, status : " +
							err.response.status
					);
				});
		},
	},
	getters: {
		totalEntré(state) {
			return state.totalEntré;
		},
		totalSortie(state) {
			return state.totalSortie;
		},
		mouvements(state) {
			return state.mouvements;
		},
		test() {
			console.log("hello");
		},
	},
};
