import axios from "axios";

export default {
	namespaced: true,
	state() {
		return {
			userId: null,
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
		async logout({ commit, state }) {
			const data = { ...state.user };
			localStorage.removeItem("userId");
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			await commit("resetUser");
			await axios
				.post("/api/logout", data)
				.then((r) => console.log(r.data))
				.catch((r) => console.log(r));
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
					localStorage.setItem("userId", res.data.user.id);
					localStorage.setItem("user", JSON.stringify(res.data.user));
					localStorage.setItem("token", res.data.token);
					context.commit("setUser", data);
					console.log(res);
				})
				.catch((err) => {
					throw err.response.data.message;
				});
		},
		tryLogin(context) {
			const userId = localStorage.getItem("userId");
			const user = JSON.parse(localStorage.getItem("user"));
			const token = localStorage.getItem("token");
			console.log(user);
			if (user && token) {
				context.commit("setUser", { userId: userId, user: user, token: token });
			}
		},
	},
	getters: {
		userId(state) {
			return state.userId;
		},
	},
};
