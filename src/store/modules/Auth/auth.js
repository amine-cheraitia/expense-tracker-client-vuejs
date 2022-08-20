import axios from "axios";

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
		setUser(state, payload) {
			state.userId = payload.userId;
			state.user = payload.user;
			state.token = payload.token;
		},
	},
	actions: {
		async logout(context) {
			localStorage.removeItem("userId");
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			await context.commit("resetUser");
		},
		async login(context, payload) {
			await axios
				.post("/api/login", payload)
				.then((res) => {
					const data = {
						userId: res.data.user.id,
						user: res.data.user,
						token: res.data.token,
					};
					context.commit("setUser", data);
					console.log(res);
				})
				.catch((err) => {
					throw err.response.data.message;
				});
		},
	},
	getters: {
		userId(state) {
			return state.userId;
		},
	},
};
