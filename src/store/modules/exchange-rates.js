import { HTTP_RATES } from '@/axios/';

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
			let data;
			await HTTP_RATES.get()
				.then(response => {
					data = response.data;
				});
			commit('set', { baseСurrency: data.base, rates: data.rates, ratesListNames: Object.keys(data.rates) });
		}
	},
}