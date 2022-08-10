<template>
  <div class="weather-container">
    <template v-if="isError">
      <div class="error-messange">
        <h1>Sorry, your city was not found</h1>
      </div>
    </template>
    <template v-else-if="loaded">
      <div class="current-weather">
        <div class="current-weather__info">
          <h1>{{ cityName }}</h1>
          <p>{{ currentDayName }}</p>
          <p>{{ currentFullDate }}</p>
          <p class="current-weather__wind">Wind {{ currentWind }} km/h</p>
        </div>
        <div class="current-weather__icon">
          <img :src="currentWeatherIconSrc" alt="weather" />
        </div>
        <div class="current-weather__temp">
          <div class="current-weather__other-temp">
            <span>Min: {{ minWeatherTemperature }}°C</span>
            <span>Max: {{ maxtWeatherTemperature }}°C</span>
          </div>
          <div class="current-weather__current-temp">
            {{ currentWeatherTemperature }}°C
          </div>
        </div>
      </div>
      <weather-item v-for="(day, index) in listDays" :key="index" :day="day" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WeatherItem from '@/components/WeatherItem.vue';

const DAY_NAME = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];
export default {
  components: {
    WeatherItem,
  },
  computed: {
    ...mapGetters('weather', [
      'listDays',
      'cityName',
      'firstDay',
      'isError',
      'loaded',
    ]),
    currentWeatherTemperature() {
      return Math.trunc(this.firstDay.main.temp);
    },
    minWeatherTemperature() {
      return Math.trunc(this.firstDay.main.temp_min);
    },
    maxtWeatherTemperature() {
      return Math.trunc(this.firstDay.main.temp_max);
    },
    currentWeatherIconSrc() {
      return `https://openweathermap.org/img/wn/${this.firstDay.weather[0]['icon']}@4x.png`;
    },
    currentWind() {
      return this.firstDay.wind.speed;
    },
    currentFullDate() {
      const dayData = this.firstDay.dt_txt;

      let day = new Date(dayData).getDay();
      day = String(day).length === 1 ? '0' + day : day;

      let month = new Date(dayData).getMonth();
      month = String(month).length === 1 ? '0' + month : month;

      const year = new Date(dayData).getFullYear();
      return `${year}-${month}-${day}`;
    },
    currentDayName() {
      let numDay = new Date(this.firstDay.dt_txt).getDay();
      return DAY_NAME[numDay];
    },
  },
};
</script>

<style>
.weather-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8vh 10vh;
  background: #fafafa;
}

.current-weather {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 50px;
}

.current-weather__info {
  font-size: 43px;
  text-transform: uppercase;
  text-align: left;
}

.current-weather__info p {
  margin: 20px 0;
}

.current-weather__wind {
  font-size: 25px;
  text-transform: initial;
}

.current-weather__temp {
  font-weight: 600;
}

.current-weather__other-temp {
  display: flex;
  justify-content: space-around;
  font-size: 18px;
}

.current-weather__current-temp {
  font-size: 116px;
}

.error-messange {
  font-size: 35px;
  text-transform: uppercase;
}
</style>
