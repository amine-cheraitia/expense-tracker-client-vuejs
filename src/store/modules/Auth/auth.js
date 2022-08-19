export default {
	namespaced: true,
	state() {
		return {
			userId: 1,
			user: null,
			token: null,
		};
	},
	mutations: {
		resetUser(state) {
			state.userId = null;
			state.user = null;
			state.token = null;
		},
	},
	actions: {
		async logout(context) {
			localStorage.removeItem("userId");
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			await context.commit("resetUser");
		},
	},
	getters: {
		userId(state) {
			return state.userId;
		},
	},
};
