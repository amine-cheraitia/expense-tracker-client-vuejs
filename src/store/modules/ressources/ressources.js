import axios from "axios";

export default {
	namespaced: true,
	state() {
		return {
			solde: 0,
			ressources: [
				{
					id: 5,
				},
			],
		};
	},
	mutations: {
		setRessources(state, payload) {
			/* state.ressources.push(...payload); version qui nest ok 100*/
			state.ressources = [...payload];
		},
	},
	actions: {
		async loadRessources(context) {
			let ressources;
			const userId = context.rootGetters["auth/userId"];
			await axios
				.get("http://127.0.0.1:8000/api/ressource/user/" + userId)
				.then((result) => {
					ressources = result.data;
				})
				.catch((err) => {
					console.log(err);
				});

			context.commit("setRessources", ressources);
		},
	},
	getters: {
		solde(state) {
			return state.solde;
		},
		ressources(state) {
			return state.ressources;
		},
	},
};
