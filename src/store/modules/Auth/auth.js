export default {
	namespaced: true,
	state() {
		return {
			userId: 1,
			username: "",
			token: null,
		};
	},
	mutations: {},
	actions: {},
	getters: {
		userId(state) {
			return state.userId;
		},
	},
};
