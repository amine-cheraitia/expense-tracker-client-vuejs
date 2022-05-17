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
		};
	},
	mutations: {
		setMouvement(state, payload) {
			state.mouvements = [...payload];
		},
	},
	actions: {
		async loadMouvement(context) {
			let ressource = await axios.get("http://127.0.0.1:8000/api/mouvement");

			let mouvements = ressource.data;

			context.commit("setMouvement", mouvements);
		},
	},
	getters: {
		mouvements(state) {
			return state.mouvements;
		},
		test() {
			console.log("hello");
		},
	},
};
