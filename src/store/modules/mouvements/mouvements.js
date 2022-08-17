import axios from "axios";
export default {
	namespaced: true,
	state() {
		return {
			mouvements: [
				{
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
				},
			],
			totalEntré: 0,
			totalSortie: 0,
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
	},
	actions: {
		async loadEntréSortie(context) {
			const userId = context.rootGetters["auth/userId"];

			await axios
				.get("http://127.0.0.1:8000/api/ressourcetotal/user/" + userId)
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
			let ressource = await axios.get("http://127.0.0.1:8000/api/mouvement");

			let mouvements = ressource.data;

			context.commit("setMouvement", mouvements);
		},
		async deleteMouvement(context, payload) {
			await axios
				.delete("http://127.0.0.1:8000/api/mouvement/" + payload)
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
