//import { HTTP_WEATHER } from '@/axios/';
import axios from 'axios';

const API_KEY = 'b35878a2c5ab36e25486221e2dcd1cc3';

const filterdWeatherByDay = (data) => {
	const groupDays = [];
	data.list.forEach(dateItem => {
		const targetDay = new Date(dateItem.dt_txt).getDay();
		groupDays[targetDay] ? groupDays[targetDay].push(dateItem) : groupDays[targetDay] = [dateItem]
	});
	const days = groupDays.filter(Boolean).flatMap(item => {
		return item[Math.floor(item.length / 2)]
	}).sort((a, b) => a.dt - b.dt);
	days.shift();
	return days;
}

export default {
	namespaced: true,
	state: {
		arrlistDays: [],
		cityName: '',
		cityList: [],
		firtsDay: {},
		enterCity: 'Moscow',
		isError: false,
		loaded: false
	},
	mutations: {
		set(state, udatedState) {
			for (const key in udatedState) {
				state[key] = udatedState[key]
			}
		},
		addCityList(state, pushValue) {
			if (!state.cityList.includes(pushValue)) {
				state.cityList.push(pushValue);
				if (state.cityList.length > 4) {
					state.cityList.shift();
				}
				localStorage.setItem("city-list", JSON.stringify(state.cityList));
			}
		},
	},
	getters: {
		listDays(state) {
			return state.arrlistDays
		},
		cityName(state) {
			return state.cityName
		},
		firstDay(state) {
			return state.firstDay
		},
		enterCity(state) {
			return state.enterCity
		},
		isError(state) {
			return state.isError
		},
		loaded(state) {
			return state.loaded
		},
		cityList(state) {
			return state.cityList
		}

	},
	actions: {
		async fetchWeather({ commit, state }, city = state.enterCity) {
			try {
				const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
				commit('set', { enterCity: city, firstDay: data?.list?.[0] || '', cityName: data.city.name, loaded: true },);
				commit('addCityList', city)
				const days = filterdWeatherByDay(data);
				commit('set', { arrlistDays: days });
				if (state.isError) {
					commit('set', { isError: false });
				}
			} catch (error) {
				commit('set', { isError: true });
			}
		}
	},
}