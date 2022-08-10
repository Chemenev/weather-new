import axios from "axios"

export default {
	namespaced: true,
	state: {
		rates: [],
		currentRates: [],
		ratesListNames: [],
		rateName: '',
		baseСurrency: ''
	},
	mutations: {
		set(state, udatedState) {
			for (const key in udatedState) {
				state[key] = udatedState[key]
			}
		},
		addRates(state, pushValue) {
			state.currentRates.push(pushValue)
		}
	},
	getters: {
		listRates(state) {
			return state.rates
		},
		listRatesNames(state) {
			return state.ratesListNames
		},
		rateName(state) {
			return state.rateName
		},
		currentRates(state) {
			return state.currentRates
		},
		baseСurrency(state) {
			return state.baseСurrency
		}
	},
	actions: {
		async fetchRates({ commit }) {
			const { data } = await axios.get('https://cdn.cur.su/api/cbr.json');
			commit('set', { baseСurrency: data.base, rates: data.rates, ratesListNames: Object.keys(data.rates) });
		}
	},
}