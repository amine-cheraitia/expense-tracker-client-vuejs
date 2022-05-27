import axios from "axios";

export default {
	namespaced: true,
	state() {
		return {
			solde: null,
			ressources: [
				{
					id: 5,
				},
			],
			type_ressources: [],
		};
	},
	mutations: {
		setRessources(state, payload) {
			/* state.ressources.push(...payload); version qui nest ok 100*/
			state.ressources = [...payload];
		},
		setSolde(state, payload) {
			state.solde = payload;
		},
		setRessourcesType(state, payload) {
			state.type_ressources = [...payload];
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
					let soldeGlobale = 0;
					for (const key in ressources) {
						soldeGlobale += Number(ressources[key].solde);
					}

					context.commit("setSolde", soldeGlobale.toFixed(2));
				})
				.catch((err) => {
					console.log(err);
				});

			context.commit("setRessources", ressources);
		},
		async loadRessourcesType(context) {
			await axios
				.get("http://127.0.0.1:8000/api/typeressource")
				.then((result) => {
					context.commit("setRessourcesType", result.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	getters: {
		solde(state) {
			return state.solde;
		},
		ressources(state) {
			return state.ressources;
		},
		typeressources(state) {
			return state.type_ressources;
		},
	},
};
